import { Test, TestingModule } from '@nestjs/testing';
import { CleanupController } from './cleanup.controller';
import { CleanupService } from './cleanup.service';

describe('CleanupController', () => {
  let controller: CleanupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanupController],
      providers: [CleanupService],
    }).compile();

    controller = module.get<CleanupController>(CleanupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
