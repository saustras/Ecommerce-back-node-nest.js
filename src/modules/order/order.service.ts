import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { QueryFailedError, Repository } from 'typeorm';
import { ResponseDataDTO } from 'src/core/interfaces/response.data.dto';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { AddressResponseDto } from '../address/dto/address_response.dto';
import { OrderEntity } from '../infrastructure/entities/Order.entity';
import { v2 as cloudinary } from 'cloudinary';
import { OrderResponseDto } from './dto/order_response.dto';
import { OrderCreateDto } from './dto/order_create.dto';
import { UserEntity } from '../infrastructure/entities/user.entity';
import { StripeService } from 'src/config/stripe.service';
import { ProductEntity } from '../infrastructure/entities/Product.entity';



@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private repository: Repository<OrderEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private commonFilterService: CommonFilterService,
    private stripeService: StripeService,
  ) {}

  async findAllRegisters(query: PaginateQuery): Promise<ResponseDataDTO<OrderResponseDto> | any> {
    const queryBuilder = this.repository.createQueryBuilder('Order')
      .leftJoinAndMapOne('Order.user', UserEntity, 'user', 'Order.userId = user.id');

      if (query.filter && query.filter['user.id']) {
        queryBuilder.where('user.id = :userId', { userId: query.filter['user.id'] });
      }
    return await this.commonFilterService.paginateFilter<OrderEntity>(query, this.repository, queryBuilder, 'id');

  }

  async findOne(id: number) {
    const Order = await this.repository
          .createQueryBuilder('Order')
          .leftJoinAndSelect('Order.user', 'user') 
          .where('Order.id = :id', { id })
          .getOne();

    const responseDto = plainToClass(OrderResponseDto, instanceToPlain(Order));
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


   calcDiscountPrice(price:number, discount:number) {
      if (!discount) return price;

      const discountAmount = (price * discount)/ 100;
      const result = price - discountAmount;
      return result.toFixed(2);
  }

  async createNewRegister(dto: OrderCreateDto) {
    try {
      const currency = "usd";
      let tempPayment = 0;

      const verifiedProducts = await Promise.all(dto.products.map(async (product) => {
        const foundProduct = await this.productRepository.findOne({ where: { id: product.id } });
        if (!foundProduct) {
          throw new HttpException(`El producto con id ${product.id} no existe.`, HttpStatus.BAD_REQUEST);
        }
        return foundProduct;
      }));

      verifiedProducts.forEach(product => {
        const originalProduct = dto.products.find(p => p.id === product.id);
        console.log('original product', originalProduct)
        product.quantity =originalProduct.quantity;
        product.platform = originalProduct.platform;
        console.log( 'plataforma es ',product.platform)

        const priceTemp = this.calcDiscountPrice(product.price, product.discount);
        tempPayment += Number(priceTemp) * originalProduct.quantity;
      });
      
      const user = await this.userRepository.findOne({where: { id:  dto.user} });
        if (!user) {
          throw new HttpException("El usuario no existe.", HttpStatus.BAD_REQUEST);
        }



      
      const totalPayment = Math.round(tempPayment * 100);
      
      const charge = await this.stripeService.createCharge(
        totalPayment,
        currency,
        dto.idPayment,
        `User ID: ${dto.user}`
      );

      dto.idPayment = charge.id;

      const Order  = plainToClass(OrderEntity, dto);
      Order.user = user;
      Order.totalPayment = totalPayment/100;
      Order.products = verifiedProducts;

      const creation = await this.repository.save(Order);
      const responseDto = plainToClass(OrderResponseDto,instanceToPlain(creation));

      return {
        statusCode: HttpStatus.OK,
        message: [CRUDMessages.CreateSuccess],
        data: responseDto,
      }; 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
