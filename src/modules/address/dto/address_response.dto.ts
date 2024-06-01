import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class AddressResponseDto {
  @ApiProperty({ title: 'id', example: 1 })
  id: number;

  @ApiProperty({ title: 'título', example: 'Casa' })
  title: string;

  @ApiProperty({ title: 'nombre', example: 'Federico' })
  name: string;

  @ApiProperty({ title: 'dirección', example: '123 Calle Principal' })
  address: string;

  @ApiProperty({ title: 'ciudad', example: 'Ciudad' })
  city: string;

  @ApiProperty({ title: 'estado', example: 'Estado' })
  state: string;

  @ApiProperty({ title: 'código postal', example: '12345' })
  postal_code: string;

  @ApiProperty({ title: 'teléfono', example: '123-456-7890' })
  phone: string;

  @ApiProperty({ title: 'usuario', example: 1, type: () => UserDto })
  user: UserDto;
}
