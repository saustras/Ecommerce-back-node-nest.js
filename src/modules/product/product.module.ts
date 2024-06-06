import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PlatformEntity } from '../infrastructure/entities/platform.entity';
import { CloudinaryProvider } from 'src/config/cloudinari.service';
import { ProductEntity } from '../infrastructure/entities/product.entity';



@Module({
  imports: [TypeOrmModule.forFeature([PlatformEntity, ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, CommonFilterService],
  exports: [ProductService],
})
export class ProductModule {}
