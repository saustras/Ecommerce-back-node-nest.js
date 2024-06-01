import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


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

  @Column('character varying', {
    name: 'icono',
    length: 500,
    nullable: false,
  })
  icon: string;

}