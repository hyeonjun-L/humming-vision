import { CreateCameraProductDto } from '../camera/dto/create-camera-product.dto';
import { CreateFrameGrabberProductDto } from '../frame-grabber/dto/create-frame-grabber-product.dto';
import { CreateLensProductDto } from '../lens/dto/create-lens-product.dto';
import { CreateLightProductDto } from '../light/dto/create-light-product.dto';
import { CreateSoftwareProductDto } from '../software/dto/create-software-product.dto';

export enum CategoriesEnum {
  SOFTWARE = 'SOFTWARE',
  FRAMEGRABBER = 'FRAMEGRABBER',
  CAMERA = 'CAMERA',
  LENS = 'LENS',
  LIGHT = 'LIGHT',
}

export enum CategoryRelationMap {
  SOFTWARE = 'software',
  FRAMEGRABBER = 'frameGrabber',
  CAMERA = 'camera',
  LENS = 'lens',
  LIGHT = 'light',
}

export const CREATE_CATEGORY_DTO_MAPPING = {
  [CategoriesEnum.CAMERA]: CreateCameraProductDto,
  [CategoriesEnum.FRAMEGRABBER]: CreateFrameGrabberProductDto,
  [CategoriesEnum.LENS]: CreateLensProductDto,
  [CategoriesEnum.SOFTWARE]: CreateSoftwareProductDto,
  [CategoriesEnum.LIGHT]: CreateLightProductDto,
};
