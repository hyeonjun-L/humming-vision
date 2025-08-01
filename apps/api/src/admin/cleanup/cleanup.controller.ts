import { Controller, Delete } from '@nestjs/common';
import { CleanupService } from './cleanup.service';

@Controller('cleanup')
export class CleanupController {
  constructor(private readonly cleanupService: CleanupService) {}

  @Delete()
  async cleanup() {
    return this.cleanupService.cleanupS3Orphans();
  }
}
