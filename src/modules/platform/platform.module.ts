import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { PlatformEntity } from '../infrastructure/entities/platform.entity';
import { CloudinaryProvider } from 'src/config/cloudinari.service';



@Module({
  imports: [TypeOrmModule.forFeature([PlatformEntity])],
  controllers: [PlatformController],
  providers: [PlatformService, CommonFilterService],
  exports: [PlatformService],
})
export class PlatformModule {}
