import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/modules/infrastructure/entities/Product.entity';

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

  @ApiProperty({ title: 'products', example: 1, type: () => ProductEntity })
  products: ProductEntity[];
}
