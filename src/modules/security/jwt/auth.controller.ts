import { Controller, Post, UseGuards, Request, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from '../../../guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/guard/role.enum';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto.username, loginDto.password);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      // Aquí puedes manejar errores específicos si es necesario
      throw new HttpException('Credenciales incorrectas.', HttpStatus.UNAUTHORIZED);
    }
  }
}