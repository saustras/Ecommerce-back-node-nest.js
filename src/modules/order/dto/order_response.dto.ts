import { ApiProperty } from '@nestjs/swagger';
import { IOrderProduct } from 'src/interface/Iorder_product.interface';
import { PlatformResponseDto } from 'src/modules/platform/dto/platform_response.dto';


export class OrderResponseDto {
  @ApiProperty({ title: 'id', example: 1 })
  id: number;

  @ApiProperty({ title: 'id-pago', example: 'id-pago' })
  idPayment: string;

  @ApiProperty({ title: 'total-pagado', example: 20000 })
  totalPayment: number;

  @ApiProperty({ title: 'direccion-envio', example: 'cra1w' })
  addressShipping: string;

  @ApiProperty({ title: 'productos'})
  products: IOrderProduct[];

  @ApiProperty({ title: 'platform', type: PlatformResponseDto })
  platform: PlatformResponseDto;
}
