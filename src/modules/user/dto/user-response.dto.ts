import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "src/modules/infrastructure/entities/role.entity";

export class UserResponseDto {
    @ApiProperty({ title: "id", example: 1 })
    id: number;
  
    @ApiProperty({ title: "usuario", example: "Dato de tipo texto" })
    username: string;
  
    @ApiProperty({ title: "nombre", example: "Dato de tipo texto" })
    name: string;

    @ApiProperty({ title: "apellido", example: "Dato de tipo texto" })
    lastname: string;
  
    @ApiProperty({ title: "correo", example: "Dato de tipo correo" })
    email: string;

    @ApiProperty({ title: "fecha-creado", example: "Dato de tipo fecha" })
    createdAt: Date;
  
    @ApiProperty({ title: 'role', example: 1, type: () => RoleEntity })
    role: RoleEntity;
  }