import { ApiProperty } from '@nestjs/swagger';
import { PlatformResponseDto } from 'src/modules/platform/dto/platform_response.dto';


export class ProductResponseDto {
  @ApiProperty({ title: 'id', example: 1 })
  id: number;

  @ApiProperty({ title: 'título', example: 'Producto 1' })
  title: string;

  @ApiProperty({ title: 'descuento', example: 10 })
  discount: number;

  @ApiProperty({ title: 'slug', example: 'producto-1' })
  slug: string;

  @ApiProperty({ title: 'descripción', example: 'Descripción del producto' })
  summary: string;

  @ApiProperty({ title: 'video', example: 'https://video.com' })
  video: string;

  @ApiProperty({ title: 'imagen'})
  cover: Icon;

  @ApiProperty({ title: 'wallpaper'})
  wallpaper: Icon;

  @ApiProperty({ title: 'screenshots'})
  screenshots: Icon[];

  @ApiProperty({ title: 'platform', type: PlatformResponseDto })
  platform: PlatformResponseDto;
}
