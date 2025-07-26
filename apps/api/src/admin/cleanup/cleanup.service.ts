import { DeleteS3Response } from '@humming-vision/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/common/aws/aws.service';
import { ProductModel } from 'src/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CleanupService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
    private readonly awsService: AwsService,
  ) {}

  async cleanupS3Orphans(): Promise<DeleteS3Response> {
    const allProductPdfKeys = await this.productRepository
      .createQueryBuilder('product')
      .select('product.datasheetUrl')
      .addSelect('product.drawingUrl')
      .addSelect('product.manualUrl')
      .getMany();

    const allProductsWithImages = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'image')
      .getMany();

    const allImagePaths = allProductsWithImages.flatMap((product) =>
      product.images.map((img) => img.path),
    );

    const allS3Keys = await this.awsService.getAllKeysFromS3();

    const extractS3Key = (url: string): string => {
      try {
        return new URL(url).pathname.slice(1);
      } catch {
        return '';
      }
    };

    const imageKeysInUse = allImagePaths.map(extractS3Key);
    const pdfKeysInUse = allProductPdfKeys.flatMap((item) => [
      extractS3Key(item.datasheetUrl),
      extractS3Key(item.drawingUrl),
      extractS3Key(item.manualUrl),
    ]);

    const usedKeys = new Set([
      ...imageKeysInUse.filter(Boolean),
      ...pdfKeysInUse.filter(Boolean),
    ]);

    const orphanKeys = allS3Keys.filter(
      (key) => !usedKeys.has(key) && !key.endsWith('/'),
    );

    await this.awsService.deleteObjects(orphanKeys);

    return {
      deletedKeys: orphanKeys,
      totalDeleted: orphanKeys.length,
    };
  }
}
