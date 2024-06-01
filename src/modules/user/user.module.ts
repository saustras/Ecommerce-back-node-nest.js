import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { RoleEntity } from '../infrastructure/entities/role.entity';
import { AddressService } from '../address/address.service';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,RoleEntity])],
  controllers: [UserController],
  providers: [UserService, CommonFilterService],
  exports: [UserService],
})
export class UserModule {}
