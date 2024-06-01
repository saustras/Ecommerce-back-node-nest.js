import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, Max } from 'class-validator';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Message } from 'src/shared/utils/message.decorator';

export class AddressDto {
  @ApiProperty({ title: 'id', example: 1, required: true })
  id: number;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'título', example: 'Casa', required: true })
  title: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'nombre', example: 'Federico', required: true })
  name: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'dirección', example: '123 Calle Principal', required: true })
  address: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'ciudad', example: 'Ciudad', required: true })
  city: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'estado', example: 'Estado', required: true })
  state: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'código postal', example: '12345', required: true })
  postal_code: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'teléfono', example: '123-456-7890', required: true })
  phone: string;

}
