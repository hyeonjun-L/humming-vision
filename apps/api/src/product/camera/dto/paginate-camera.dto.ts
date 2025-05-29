import { PartialType, PickType } from '@nestjs/mapped-types';
import { BaseCameraDto } from './create-camera.dto';

export class PaginateCameraDto extends PartialType(
  PickType(BaseCameraDto, [
    'maker',
    'resolutionX',
    'resolutionY',
    'speed',
    'interface',
  ] as const),
) {}
