import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  name: string;

  @OneToMany(() => UserEntity, user => user.role)
  users: UserEntity[];
}