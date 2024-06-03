import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Message } from 'src/shared/utils/message.decorator';

export class AddressUpdateDto {
  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'título', example: 'Casa', required: false })
  @IsOptional()
  title: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'nombre', example: 'Federico', required: false })
  @IsOptional()
  name: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'dirección', example: '123 Calle Principal', required: false })
  @IsOptional()
  address: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'ciudad', example: 'Ciudad', required: false })
  @IsOptional()
  city: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'estado', example: 'Estado', required: false })
  @IsOptional()
  state: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'código postal', example: '12345', required: false })
  @IsOptional()
  postal_code: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'teléfono', example: '123-456-7890', required: false })
  @IsOptional()
  phone: string;

  @IsNumber({}, { message: Message.NUMBER("$property") })
  @Max(9999999999, { message: "El maximo valor debe ser 9999999999" })
  @ApiProperty({ title: "role", example: "Dato de tipo numérico", required: false })
  @IsOptional()
  user: number;
}
