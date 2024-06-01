import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { ResponseDataDTO } from 'src/core/interfaces/response.data.dto';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { RoleEntity } from '../infrastructure/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { AddressEntity } from '../infrastructure/entities/address.entity';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { AddressResponseDto } from './dto/address_response.dto';
import { AddressCreateDto } from './dto/address_create.dto';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity) private repository: Repository<AddressEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private commonFilterService: CommonFilterService,
  ) {}

  async findAllRegisters(query: PaginateQuery): Promise<ResponseDataDTO<AddressResponseDto> | any> {
    const queryBuilder = this.repository.createQueryBuilder('address')
          .leftJoinAndMapOne('address.user', UserEntity, 'user', 'address.userId = user.id');
    const response = await this.commonFilterService.paginateFilter<AddressEntity>(query, this.repository, queryBuilder, 'id');

    if (response.statusCode === HttpStatus.NOT_FOUND) {
        throw new HttpException(response, HttpStatus.NOT_FOUND);
    }

    const transformedData = response.data.map(address => {
      const plainAddress = instanceToPlain(address);
      if (plainAddress.user) {
          delete plainAddress.user.password;
      }
      return plainToInstance(AddressResponseDto, plainAddress);
  });

  return {
      ...response,
      data: transformedData,
  };
}

  async findOne(id: number) {
    const address = await this.repository
      .createQueryBuilder('address')
      .leftJoinAndSelect('address.user', 'user') 
      .where('address.id = :id', { id })
      .getOne();

      if (address && address.user) {
        delete address.user.password;
      }
      
      const responseDto = plainToClass(AddressResponseDto, instanceToPlain(address));
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

  async createNewRegister(dto: AddressCreateDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id:  dto.user} });
      if (!user) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['No existe el usuario.'],
        };
      }

      const addressEntity = plainToClass(AddressEntity, dto);

      const creation = await this.repository.save(addressEntity);
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

  async updateRegister(dto: AddressCreateDto, id: number) {
    try {
      const addressEntity = plainToClass(AddressEntity, dto);
      const { affected } = await this.repository.update({ id: id }, addressEntity);
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
