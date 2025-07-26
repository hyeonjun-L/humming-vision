import { CategoriesEnum } from '@humming-vision/shared';
import { CreateCameraProductDto } from '../camera/dto/create-camera-product.dto';
import { UpdateCameraProductDto } from '../camera/dto/update-camera-product.dto';
import { CreateFrameGrabberProductDto } from '../frame-grabber/dto/create-frame-grabber-product.dto';
import { UpdateFrameGrabberProductDto } from '../frame-grabber/dto/update-fame-grabber-product.dto';
import { CreateLensProductDto } from '../lens/dto/create-lens-product.dto';
import { UpdateLensProductDto } from '../lens/dto/update-lens-product.dto';
import { CreateLightProductDto } from '../light/dto/create-light-product.dto';
import { UpdateLightProductDto } from '../light/dto/update-light-product.dto';
import { CreateSoftwareProductDto } from '../software/dto/create-software-product.dto';
import { UpdateSoftwareProductDto } from '../software/dto/update-software-product.dto';

export type CreateCategoryDtoMap = {
  [CategoriesEnum.CAMERA]: CreateCameraProductDto;
  [CategoriesEnum.FRAMEGRABBER]: CreateFrameGrabberProductDto;
  [CategoriesEnum.LENS]: CreateLensProductDto;
  [CategoriesEnum.SOFTWARE]: CreateSoftwareProductDto;
  [CategoriesEnum.LIGHT]: CreateLightProductDto;
};

export type UpdateCategoryDtoMap = {
  [CategoriesEnum.CAMERA]: UpdateCameraProductDto;
  [CategoriesEnum.FRAMEGRABBER]: UpdateFrameGrabberProductDto;
  [CategoriesEnum.LENS]: UpdateLensProductDto;
  [CategoriesEnum.SOFTWARE]: UpdateSoftwareProductDto;
  [CategoriesEnum.LIGHT]: UpdateLightProductDto;
};
