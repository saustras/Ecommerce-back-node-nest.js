import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'titulo',
    length: 500,
    nullable: false,
  })
  title: string;

  
  @Column('character varying', {
    name: 'nombre',
    length: 500,
    nullable: false,
  })
  name: string;

  @Column('character varying', {
    name: 'direccion',
    length: 500,
    nullable: false,
  })
  address: string;

  @Column('character varying', {
    name: 'ciudad',
    nullable: false,
  })
  city: string;

  @Column('character varying', {
    name: 'pais',
    length: 500,
    nullable: false,
  })
  state: string;

  @Column('character varying', {
    name: 'postal_codigo',
    length: 500,
    nullable: false,
  })
  postal_code: string;

  @Column('character varying', {
    name: 'telefono',
    length: 500,
    nullable: false,
  })
  phone: string;

  @ManyToOne(() => UserEntity, user => user.address)
  user: UserEntity;
}