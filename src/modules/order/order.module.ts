import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { StripeService } from 'src/config/stripe.service';
import { OrderEntity } from '../infrastructure/entities/order.entity';



@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrderController],
  providers: [OrderService, CommonFilterService, StripeService],
  exports: [OrderService],
})
export class OrderModule {}
