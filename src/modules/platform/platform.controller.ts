import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PlatformService } from './platform.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/guard/role.enum';
import { PlatformResponseDto } from './dto/platform_response.dto';
import { PlatformCreateDto } from './dto/platform_create.dto';
import { MulterConfig } from 'src/config/multer.service';
import { FileInterceptor } from '@nestjs/platform-express';



@ApiCreatedResponse()
@ApiTags('Platform')
@Controller('Platform')

export class PlatformController {
    
    constructor(private readonly service: PlatformService) { }

    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiResponse({
        status: 200,
        type: [PlatformResponseDto],
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
        type: PlatformResponseDto,
    })
    
    @Get(':id')
    async findOneRegisterById(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @ApiOperation({ summary: 'Guardar nuevo registro' })
    @ApiBody({ type: PlatformCreateDto })
    @ApiResponse({
        status: 200,
        description: 'Guarda un nuevo registro',
        type: PlatformResponseDto,
    })

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('file', MulterConfig))
    async createNewRegister(@Body() dto: PlatformCreateDto, @UploadedFile() file: Express.Multer.File) {
        return await this.service.createNewRegister(dto, file);
    }

    @ApiOperation({ summary: 'Actualiza un registro' })
    @ApiBody({ type: PlatformCreateDto })
    @ApiParam({
        name: 'id',
        description: 'Identificador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza un registro',
        type: PlatformResponseDto,
    })
    
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id') 
    @UseInterceptors(FileInterceptor('file', MulterConfig))
    async updateRegister(@Body() dto: PlatformCreateDto, @Param('id') id: number, @UploadedFile() file: Express.Multer.File ) {
        return await this.service.updateRegister(dto, id, file);
    }

    @ApiOperation({ summary: 'Elimina un registro por identificador' })
    @ApiParam({
        name: 'id',
        description: 'Busca por su identificador',
    })
    
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteRegister(@Param('id') id: any) {
        return await this.service.deleteRegister(id);
    }
}
