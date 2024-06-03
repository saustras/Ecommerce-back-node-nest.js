import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { ResponseDataDTO } from 'src/core/interfaces/response.data.dto';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { AddressEntity } from '../infrastructure/entities/address.entity';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { AddressResponseDto } from '../address/dto/address_response.dto';
import { PlatformCreateDto } from './dto/platform_create.dto';
import { PlatformResponseDto } from './dto/platform_response.dto';
import { PlatformEntity } from '../infrastructure/entities/platform.entity';
import { v2 as cloudinary } from 'cloudinary';
import { ProductEntity } from '../infrastructure/entities/Product.entity';



@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatformEntity) private repository: Repository<PlatformEntity>,
    @InjectRepository(PlatformEntity) private productRepository: Repository<ProductEntity>,
    private commonFilterService: CommonFilterService,
  ) {}

  async findAllRegisters(query: PaginateQuery): Promise<ResponseDataDTO<PlatformResponseDto> | any> {
    const queryBuilder = this.repository.createQueryBuilder('platform')
      .leftJoinAndSelect('platform.products', 'products');
    return await this.commonFilterService.paginateFilter<PlatformEntity>(query, this.repository, queryBuilder, 'id');

}

  async findOne(id: number) {
    const platform = await this.repository.findOne({where: { id:  id} });
    const responseDto = plainToClass(PlatformResponseDto, instanceToPlain(platform));
    return responseDto
      ? {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.GetSuccess],
          data: responseDto,
          count: 1,
        }
      : {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [CRUDMessages.GetNotfound],
          data: [],
          count: 0,
        };
  }

  async createNewRegister(dto: PlatformCreateDto, file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      dto.icon = result;

      let products: ProductEntity [] = [];

      if (dto.products && dto.products.length > 0) {
        products = await Promise.all(
          dto.products.map(async (productId) => {
            const product = await this.productRepository.findOne({where: { id:  productId} });
            if (!product) {
              throw new Error(`El producto con el id ${productId} no se encontro.`);
            }
            return product;
          })
        );
      }

      const platform  = plainToClass(PlatformEntity, dto);
      platform.products = products;
      const creation = await this.repository.save(platform);
      const responseDto = plainToClass(AddressResponseDto,instanceToPlain(creation));

      return {
        statusCode: HttpStatus.OK,
        message: [CRUDMessages.CreateSuccess],
        data: responseDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRegister(dto: PlatformCreateDto, id: number, file: Express.Multer.File ) {
    try {
      if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        dto.icon = result;
      }

      const platform = plainToClass(PlatformEntity, dto);
      const { affected } = await this.repository.update({ id: id }, platform);
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.UpdateSuccess],
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CRUDMessages.GetNotfound],
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }

  async deleteRegister(id: number) {
    try {
      const { affected } = await this.repository.delete({ id: id });
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.DeleteSuccess],
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: [CRUDMessages.GetNotfound],
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }
}
