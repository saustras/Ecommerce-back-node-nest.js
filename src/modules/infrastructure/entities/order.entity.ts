import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { IOrderProduct } from 'src/interface/Iorder_product.interface';


@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'id-pago',
    length: 500,
    nullable: true,
  })
  idPayment: string;

  @Column('simple-json', {
    name: 'direccion-envio',
    nullable: false,
  })
  addressShipping: JSON;

  @Column({
    type: 'numeric',
    name: 'total-pagado',
    precision: 100
})
  totalPayment: number;

  @Column('simple-json', {
    name: 'productos',
    nullable: false,
  })
  products: IOrderProduct[];

  @ManyToOne(() => UserEntity, user => user.order)
  user: UserEntity;

}