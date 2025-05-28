import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { CreateFrameGrabberDto } from './dto/create-frame-grabber.dto';
import { FrameGrabberModel } from './frame-grabber.entity';
import { UpdateFrameGrabberDto } from './dto/update-frame-grabber.dto';

@Injectable()
export class FrameGrabberService {
  constructor() {}

  async createFrameGrabber(
    frameGrabberDto: CreateFrameGrabberDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const frameGrabberRepo = qr.manager.getRepository(FrameGrabberModel);

    const frameGrabber = frameGrabberRepo.create({
      ...frameGrabberDto,
      product,
    });

    return frameGrabberRepo.save(frameGrabber);
  }

  async updateFrameGrabber(
    frameGrabberDto: UpdateFrameGrabberDto,
    id: number,
    qr: QueryRunner,
  ) {
    const frameGrabberRepo = qr.manager.getRepository(FrameGrabberModel);

    const frameGrabber = await frameGrabberRepo.findOne({
      where: { id: frameGrabberDto.id, product: { id } },
    });

    if (!frameGrabber) {
      throw new NotFoundException('Frame Grabber not found');
    }

    const updatedFrameGrabber = frameGrabberRepo.merge(
      frameGrabber,
      frameGrabberDto,
    );
    return frameGrabberRepo.save(updatedFrameGrabber);
  }
}
