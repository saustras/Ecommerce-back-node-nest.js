import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsNumber, Max, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/modules/infrastructure/entities/role.entity';
import { Message } from 'src/shared/utils/message.decorator';

export class UserCreateDto {
    @IsString({ message: Message.STRING('$property') })
    @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
    @ApiProperty({ title: 'usuario', example: 'saustras', required: true })
    username: string;
  
    @IsString({ message: Message.STRING('$property') })
    @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
    @ApiProperty({ title: 'nombre', example: 'Federico', required: true })
    name: string;

    @IsString({ message: Message.STRING('$property') })
    @Length(0, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
    @ApiProperty({ title: 'apellido', example: 'rendon', required: false })
    @IsOptional()
    lastname: string;
  
    @IsEmail({}, { message: 'El correo debe ser válido' })
    @ApiProperty({ title: 'correo', example: 'federendon26@hotmail.com', required: true })
    email: string;
  
    @IsString({ message: Message.STRING('$property') })
    @Length(1, 500, { message: Message.LENGTH('$property', '$constraint1 $constraint2') })
    @ApiProperty({ title: 'contraseña', example: '123456', required: true })
    password: string;
  
    @IsNumber({}, { message: Message.NUMBER("$property") })
    @Max(9999999999, { message: "El maximo valor debe ser 9999999999" })
    @ApiProperty({ title: "role", example: "Dato de tipo numérico", required: false })
    role: number;
  }
