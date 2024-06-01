import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/shared/utils/message.decorator';
import { PlatformResponseDto } from 'src/modules/platform/dto/platform_response.dto';

export class ProductCreateDto {

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'título', example: 'Producto 1', required: false })
  title: string;

  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({ title: 'descuento', example: 10, required: false })
  @IsOptional()
  discount: number;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'slug', example: 'producto-1', required: true })
  slug: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'descripción', example: 'Descripción del producto', required: true })
  summary: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'video', example: 'https://video.com', required: true })
  video: string;

  @ValidateNested()
  @ApiProperty({ title: 'imagen', required: true })
  cover: Icon;

  @ValidateNested()
  @ApiProperty({ title: 'wallpaper', required: true })
  wallpaper: Icon;


  @ValidateNested({ each: true })
  @ApiProperty({ title: 'screenshots', required: false })
  screenshots?: Icon[];

  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({ title: 'plataforma', example: 10, required: false })
  @IsOptional()
  platform: number;
}
