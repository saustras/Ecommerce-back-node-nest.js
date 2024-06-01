import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class PlatformResponseDto {
  @ApiProperty({ title: 'id', example: 1 })
  id: number;

  @ApiProperty({ title: 'título', example: 'ps5' })
  title: string;

  @ApiProperty({ title: 'nombre', example: 'link' })
  slug: string;

  @ApiProperty({ title: 'nombre', example: 1 })
  order: number;

  @ApiProperty({ title: 'nombre', example: 'imagen' })
  icon: string;
}
