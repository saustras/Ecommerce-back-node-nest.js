import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany, CreateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { IOrderProduct } from 'src/interface/Iorder_product.interface';
import { ProductEntity } from './product.entity';


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
    precision: 10,  
    scale: 2,
})
  totalPayment: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'fecha-creado',
  })
  createdAt: Date;

  @Column('simple-json', {
    name: 'productos',
    nullable: false,
  })
  products: ProductEntity[];

  @ManyToOne(() => UserEntity, user => user.order)
  user: UserEntity;

}