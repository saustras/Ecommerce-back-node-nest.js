import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { ResponseDataDTO } from 'src/core/interfaces/response.data.dto';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { RoleEntity } from '../infrastructure/entities/role.entity';
import { UserEntity } from '../infrastructure/entities/user.entity';
import * as bcrypt from 'bcrypt';

import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-updatedto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    private commonFilterService: CommonFilterService,
  ) {}

  async findAllRegisters(query: PaginateQuery): Promise<ResponseDataDTO<UserResponseDto> | any> {
    const queryBuilder = this.repository.createQueryBuilder('user')
          .leftJoinAndMapOne('user.role', RoleEntity, 'role', 'user.roleId = role.id');
    const response = await this.commonFilterService.paginateFilter<UserResponseDto>(query, this.repository, queryBuilder, 'id');

    if (response.statusCode === HttpStatus.NOT_FOUND) {
        throw new HttpException(response, HttpStatus.NOT_FOUND);
    }

    const transformedData = response.data.map(user => {
      const plainUser = instanceToPlain(user);
      if (plainUser) {
          delete plainUser.password;
      }
      return plainToInstance(UserResponseDto, plainUser);
    });

    return {
        ...response,
        data: transformedData,
  };}

  async findOne(id: number) {
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') 
      .where('user.id = :id', { id })
      .getOne();
      
    const responseDto = plainToClass(UserResponseDto, {
      ...instanceToPlain(user),
      password: undefined, 
    } as UserEntity);
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

  async createNewRegister(dto: UserCreateDto) {
    try {
      const role = await this.roleRepository.findOne({ where: { id:  dto.role} });
      if (!role) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Role not found'],
        };
      }
      const salt = await bcrypt.genSalt(10);
      dto.password = await bcrypt.hash(dto.password, salt);

      const userEntity = plainToClass(UserEntity, dto);
      userEntity.role = role;

      const creation = await this.repository.save(userEntity);
      const responseDto = plainToClass(UserResponseDto, {
        ...instanceToPlain(creation),
        password: undefined, 
      } as UserEntity);

      return {
        statusCode: HttpStatus.OK,
        message: [CRUDMessages.CreateSuccess],
        data: responseDto,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes('unique_Username')) {
          throw new HttpException('El nombre de usuario ya existe.', HttpStatus.BAD_REQUEST);
        }
        if (error.message.includes('unique_Email')) {
          throw new HttpException('El correo ya existe.', HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRegister(dto: UserUpdateDto, id: number) {
    try {
      const userEntity = plainToClass(UserEntity, dto);
      if (dto.password) {
        const salt = await bcrypt.genSalt(10);
        userEntity.password = await bcrypt.hash(dto.password, salt);
      }
      const { affected } = await this.repository.update({ id: id }, userEntity);
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
          message: [CRUDMessages.AlreadyExists],
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
