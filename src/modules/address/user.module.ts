import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { AddressService } from './user.service';
import { AddressController } from './user.controller';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { RoleEntity } from '../infrastructure/entities/role.entity';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,RoleEntity])],
  controllers: [AddressController],
  providers: [AddressService, CommonFilterService],
  exports: [AddressService],
})
export class UserModule {}
