import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { configService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { InitService } from './app.service';
import { RoleEntity } from './modules/infrastructure/entities/role.entity';
import { UserEntity } from './modules/infrastructure/entities/user.entity';
import { AuthModule } from './modules/security/jwt/auth.module';
import { AddressService } from './modules/address/address.service';
import { CommonFilterService } from './shared/service/common-filter.service';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { UserService } from './modules/user/user.service';
import { PlatformModule } from './modules/platform/platform.module';
import { CloudinaryProvider } from './config/cloudinari.service';
import { ProductModule } from './modules/product/product.module';
import { PlatformEntity } from './modules/infrastructure/entities/platform.entity';
import { OrderModule } from './modules/order/order.module';
import { ProductEntity } from './modules/infrastructure/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PlatformEntity, ProductEntity]),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.Console({ level: 'debug' }),
      ],
    }),

    UserModule,
    AuthModule,
    AddressModule,
    PlatformModule,
    ProductModule,
    OrderModule
  ],
  providers: [InitService, UserService, CommonFilterService, CloudinaryProvider],
  controllers: [],
})
export class AppModule {}