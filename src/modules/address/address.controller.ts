import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AddressResponseDto } from './dto/address_response.dto';
import { AddressDto } from './dto/address.dto';
import { AddressCreateDto } from './dto/address_create.dto';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/guard/role.enum';
import { AddressUpdateDto } from './dto/address_update.dto';



@ApiCreatedResponse()
@ApiTags('address')
@Controller('address')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AddressController {
    
    constructor(private readonly service: AddressService) { }

    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiResponse({
        status: 200,
        type: [AddressResponseDto],
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

    @Roles(Role.ADMIN,Role.USER)
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
        type: AddressDto,
    })
    
    @Roles(Role.ADMIN,Role.USER)
    @Get(':id')
    async findOneRegisterById(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @ApiOperation({ summary: 'Guardar nuevo registro' })
    @ApiBody({ type: AddressCreateDto })
    @ApiResponse({
        status: 200,
        description: 'Guarda un nuevo registro',
        type: AddressResponseDto,
    })

    
    @Roles(Role.ADMIN,Role.USER)
    @Post()
    async createNewRegister(@Body() dto: AddressCreateDto) {
        return await this.service.createNewRegister(dto);
    }

    @ApiOperation({ summary: 'Actualiza un registro' })
    @ApiBody({ type: AddressUpdateDto })
    @ApiParam({
        name: 'id',
        description: 'Identificador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza un registro',
        type: AddressResponseDto,
    })
    
    @Roles(Role.ADMIN,Role.USER)
    @Put(':id')
    async updateRegister(@Body() dto: AddressUpdateDto, @Param('id') id: any) {
        return await this.service.updateRegister(dto, id);
    }

    @ApiOperation({ summary: 'Elimina un registro por identificador' })
    @ApiParam({
        name: 'id',
        description: 'Busca por su identificador',
    })
    
    @Roles(Role.ADMIN,Role.USER)
    @Delete(':id')
    async deleteRegister(@Param('id') id: any) {
        return await this.service.deleteRegister(id);
    }
}
