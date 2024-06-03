import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/guard/role.enum';
import { UserResponseDto } from './dto/user-response.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-updatedto';

@ApiCreatedResponse()
@ApiTags('user')
@Controller('user')
export class UserController {
    
    constructor(private readonly service: UserService) { }

    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiResponse({
        status: 200,
        type: [UserResponseDto],
    })
    @ApiQuery({
        name: 'page',
        description: 'Número de página',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: 'Limite de elementos',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'search',
        description: 'Texto a buscar',
        type: String,
        required: false,
    })

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @Get()
    async findAllRegisters(@Paginate() query: PaginateQuery) {
        return await this.service.findAllRegisters(query);
    }

    @ApiOperation({ summary: 'Busca por su identificador' })
    @ApiParam({
        name: 'id',
        description: 'Busca por su identificador',
    })
    @ApiResponse({
        status: 200,
        type: UserDto,
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @Get(':id')
    async findOneRegisterById(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @ApiOperation({ summary: 'Guardar nuevo registro' })
    @ApiBody({ type: UserCreateDto })
    @ApiResponse({
        status: 200,
        description: 'Guarda un nuevo registro',
        type: UserResponseDto,
    })

    @Post()
    async createNewRegister(@Body() dto: UserCreateDto) {
        return await this.service.createNewRegister(dto);
    }

    @ApiOperation({ summary: 'Actualiza un registro' })
    @ApiBody({ type: UserUpdateDto })
    @ApiParam({
        name: 'id',
        description: 'Identificador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza un registro',
        type: UserResponseDto,
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @Put(':id')
    async updateRegister(@Body() dto: UserUpdateDto, @Param('id') id: any) {
        return await this.service.updateRegister(dto, id);
    }

    @ApiOperation({ summary: 'Elimina un registro por identificador' })
    @ApiParam({
        name: 'id',
        description: 'Busca por su identificador',
    })
    @Roles(Role.ADMIN, Role.USER)
    @Put(':id')
    @Delete(':id')
    async deleteRegister(@Param('id') id: any) {
        return await this.service.deleteRegister(id);
    }
}
