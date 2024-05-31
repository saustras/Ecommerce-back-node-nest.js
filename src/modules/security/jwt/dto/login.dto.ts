import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsNumber, Max } from 'class-validator';
import { Message } from 'src/shared/utils/message.decorator';


export class LoginDto {

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'usuario', example: 'saustras', required: true })
  username: string;

  @IsString({ message: Message.STRING('$property') })
  @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
  @ApiProperty({ title: 'password', example: '123456', required: true })
  password: string;
}