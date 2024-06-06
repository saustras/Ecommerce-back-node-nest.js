import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/shared/utils/message.decorator';
import { IOrderProduct } from 'src/interface/Iorder_product.interface';

export class OrderCreateDto {

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'id-pago', example: 'Producto 1', required: false })
  idPayment: string;

  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({ title: 'total-pagado', example: 10, required: false })
  @IsOptional()
  totalPayment: number;

  @ValidateNested({ each: true })
  @ApiProperty({ title: 'direccion-envio', required: false })
  addressShipping: JSON;

  @ValidateNested({ each: true })
  @ApiProperty({ title: 'productos', required: false })
  products: IOrderProduct[];

  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({ title: 'usuario', example: 10, required: false })
  @IsOptional()
  user: number;
}
