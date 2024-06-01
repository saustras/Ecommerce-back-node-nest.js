import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Message } from 'src/shared/utils/message.decorator';

export class PlatformCreateDto {
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'título', example: 'Casa', required: true })
  title: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'nombre', example: 'Federico', required: true })
  slug: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'dirección', example: '123 Calle Principal', required: true })
  order: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'ciudad', example: 'Ciudad', required: false })
  @IsOptional()
  icon: string;

}
