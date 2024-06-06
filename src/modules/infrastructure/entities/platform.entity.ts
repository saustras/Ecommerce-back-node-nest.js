import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';


@Entity('platform')
export class PlatformEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'titulo',
    length: 500,
    nullable: false,
  })
  title: string;

  @Column('character varying', {
    name: 'slug',
    length: 500,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'numeric',
    name: 'orden',
    precision: 100
})
  order: number;

  @Column('simple-json', {
    name: 'icono',
    nullable: false,
  })
  icon: Icon | string;

  @OneToMany(() => ProductEntity, product => product.platform)
  products: ProductEntity[];

}