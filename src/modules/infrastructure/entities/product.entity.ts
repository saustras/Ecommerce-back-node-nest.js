import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany } from 'typeorm';
import { PlatformEntity } from './platform.entity';


@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'titulo',
    nullable: false,
    length: 500,
  })
  title: string;

  @Column({
    name: 'precio',
    nullable: true,
  })
  price: number;

  @Column({
    name: 'descuento',
    nullable: true,
  })
  discount: number;

  @Column('character varying', {
    name: 'slug',
    nullable: false,
    length: 500,
  })
  slug: string;

  @Column('character varying', {
    name: 'descripcion',
    nullable: false,
    length: 500,
  })
  summary: string;

  @Column('character varying', {
    name: 'video',
    nullable: false,
    length: 500,
  })
  video: string;

  @Column('simple-json', {
    name: 'imagen',
    nullable: false,
  })
  cover: Icon;

  @Column('simple-json', {
    name: 'wallpaper',
    nullable: false,
  })
  wallpaper: Icon;

  @Column('simple-json', {
    name: 'screenshots',
    nullable: false,
  })
  screenshots: Icon[];

  @ManyToOne(() => PlatformEntity, platform => platform.products)
  platform: PlatformEntity;

}