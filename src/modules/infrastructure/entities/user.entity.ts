import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'usuario',
    nullable: false,
    length: 500,
  })
  username: string;

  @Column('character varying', {
    name: 'nombre',
    nullable: false,
    length: 500,
  })
  name: string;

  @Column('character varying', {
    name: 'apellido',
    nullable: true,
    length: 500,
    unique:true
  })
  lastname: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  @Column('character varying', {
    name: 'correo',
    nullable: false,
    length: 500,
    unique:true
  })
  email: string;

  @Column('character varying', {
    name: 'contraseña',
    nullable: false,
    length: 500,
  })
  password: string;

  @ManyToOne(() => RoleEntity, role => role.users)
  role: RoleEntity;
}