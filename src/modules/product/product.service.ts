import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { ResponseDataDTO } from 'src/core/interfaces/response.data.dto';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { AddressResponseDto } from '../address/dto/address_response.dto';
import { ProductEntity } from '../infrastructure/entities/Product.entity';
import { v2 as cloudinary } from 'cloudinary';
import { ProductResponseDto } from './dto/product_response.dto';
import { ProductCreateDto } from './dto/product_create.dto';
import { PlatformEntity } from '../infrastructure/entities/platform.entity';



@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private repository: Repository<ProductEntity>,
    @InjectRepository(PlatformEntity) private platformRepository: Repository<PlatformEntity>,
    private commonFilterService: CommonFilterService,
  ) {}

  async findAllRegisters(query: PaginateQuery): Promise<ResponseDataDTO<ProductResponseDto> | any> {
    const queryBuilder = this.repository.createQueryBuilder('product')
      .leftJoinAndMapOne('product.platform', PlatformEntity, 'platform', 'product.platformId = platform.id');

    if (query.filter && query.filter['platform.id']) {
      queryBuilder.where('platform.id = :platformId', { platformId: query.filter['platform.id'] });
    }

    if (query.filter && query.filter['platform.slug']) {
      queryBuilder.where('platform.slug = :platformSlug', { platformSlug: query.filter['platform.slug'] });
    }


    return await this.commonFilterService.paginateFilter<ProductEntity>(query, this.repository, queryBuilder, 'id');

  }

  async findOne(id: number) {
    const product = await this.repository
          .createQueryBuilder('product')
          .leftJoinAndSelect('product.platform', 'platform') 
          .where('product.id = :id', { id })
          .getOne();

    const responseDto = plainToClass(ProductResponseDto, instanceToPlain(product));
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

  async createNewRegister(dto: ProductCreateDto, 
                          coverFile: Express.Multer.File, 
                          wallpaperFile: Express.Multer.File, 
                          screenshotFiles: Express.Multer.File[]) {
    try {
      let platform;

      if (coverFile && wallpaperFile && screenshotFiles) {
        dto.cover = await cloudinary.uploader.upload(coverFile.path);
        dto.wallpaper = await cloudinary.uploader.upload(wallpaperFile.path);
        dto.screenshots = await Promise.all(screenshotFiles.map(file => cloudinary.uploader.upload(file.path)));;
      }
      
      if (!dto.platform) {
        throw new HttpException("Ingrese la plataforma", HttpStatus.BAD_REQUEST);
      }

      platform = await this.platformRepository.findOne({where: { id:  dto.platform} });

      if (!platform) {
        throw new HttpException("La plataforma no existe.", HttpStatus.BAD_REQUEST);
      }

      const product  = plainToClass(ProductEntity, dto);
      product.platform = platform;

      const creation = await this.repository.save(product);
      const responseDto = plainToClass(ProductResponseDto,instanceToPlain(creation));

      return {
        statusCode: HttpStatus.OK,
        message: [CRUDMessages.CreateSuccess],
        data: responseDto,
      }; 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRegister(dto: ProductCreateDto, 
                      id: number, 
                      coverFile: Express.Multer.File,
                      wallpaperFile: Express.Multer.File, 
                      screenshotFiles: Express.Multer.File[] ) {
    try {
      let platform;

      if (coverFile && wallpaperFile && screenshotFiles) {
        dto.cover = await cloudinary.uploader.upload(coverFile.path);
        dto.wallpaper = await cloudinary.uploader.upload(wallpaperFile.path);
        dto.screenshots = await Promise.all(screenshotFiles.map(file => cloudinary.uploader.upload(file.path)));
      }
      if (!dto.platform) {
        throw new HttpException("Ingrese la plataforma", HttpStatus.BAD_REQUEST);
      }

      platform = await this.platformRepository.findOne({where: { id:  dto.platform} });

      if (!platform) {
        throw new HttpException("La plataforma no existe.", HttpStatus.BAD_REQUEST);
      }

      const product  = plainToClass(ProductEntity, dto);
      product.platform = platform;
      const { affected } = await this.repository.update({ id: id }, product);
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
