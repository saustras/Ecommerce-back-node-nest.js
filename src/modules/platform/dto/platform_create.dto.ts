import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, Length, Max } from 'class-validator';
import { ProductEntity } from 'src/modules/infrastructure/entities/Product.entity';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Message } from 'src/shared/utils/message.decorator';

export class PlatformCreateDto {
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'título', example: 'ps5', required: true })
  title: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'slug', example: 'play', required: true })
  slug: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'order', example: 1, required: true })
  order: string;

  @ApiProperty({ title: 'icon', example: 'icon', required: true })
  @IsOptional()
  icon: Icon;

  @IsArray({message: " El campo products deberia ser un array."})
  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsOptional()
  products: number[];

}
