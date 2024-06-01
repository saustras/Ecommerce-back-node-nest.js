import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './modules/infrastructure/entities/role.entity';
import { UserCreateDto } from './modules/user/dto/user-create.dto';
import { UserService } from './modules/user/user.service';



@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly userService: UserService
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

    const  user: UserCreateDto = {
      username: 'saustras',
      name: 'federico',
      lastname: 'rendon',
      email: 'federendon26@hotmail.com',
      password: '123456',
      role: 2,
    };

    this.userService.createNewRegister(user)
  }

}