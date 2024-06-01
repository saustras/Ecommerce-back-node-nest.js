import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { AddressEntity } from '../infrastructure/entities/address.entity';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity])],
  controllers: [AddressController],
  providers: [AddressService, CommonFilterService],
  exports: [AddressService],
})
export class AddressModule {}
