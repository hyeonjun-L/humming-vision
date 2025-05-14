import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/products.module';
import { CommonModule } from './common/common.module';
import { ContactModule } from './contact/contact.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ProductsModule, CommonModule, ContactModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
