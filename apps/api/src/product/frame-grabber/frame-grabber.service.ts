import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { FrameGrabberDto } from './dto/create-frame-grabber.dto';
import { FrameGrabberModel } from './frame-grabber.entity';

@Injectable()
export class FrameGrabberService {
  constructor() {}

  async createFrameGrabber(
    frameGrabberDto: FrameGrabberDto,
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
}
