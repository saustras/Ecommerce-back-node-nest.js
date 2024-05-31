import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './modules/infrastructure/entities/role.entity';
import { UserEntity } from './modules/infrastructure/entities/user.entity';



@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    await this.createRoles();
    await this.createUser();
  }

  private async createRoles() {
    const roles = ['USER', 'ADMIN'];
    for (const role of roles) {
      const roleExists = await this.roleRepository.findOne({ where: { name: role } });
      if (!roleExists) {
        const newRole = this.roleRepository.create({ name: role });
        await this.roleRepository.save(newRole);
      }
    }
  }

  private async createUser() {
    const role = await this.roleRepository.findOne({ where: { name: 'ADMIN' } });

    if (!role) {
      throw new Error('Role ADMIN not found');
    }

    const  user: Partial<UserEntity> = {
      username: 'saustras',
      name: 'federico',
      lastname: 'rendon',
      email: 'federendon26@hotmail.com',
      password: '123456',
      role: role,
    };

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }

}