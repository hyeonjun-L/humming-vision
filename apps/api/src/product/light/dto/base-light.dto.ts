import { IsNotEmpty, IsUrl } from 'class-validator';

export class BaseLightDto {
  @IsNotEmpty()
  @IsUrl()
  catalogUrl: string;
}
