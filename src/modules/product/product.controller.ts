import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/guard/role.enum';
import { MulterConfig } from 'src/config/multer.service';
import { ProductResponseDto } from './dto/product_response.dto';
import { ProductCreateDto } from './dto/product_create.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiCreatedResponse()
@ApiTags('product')
@Controller('product')

export class ProductController {
    
    constructor(private readonly service: ProductService) { }

    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiResponse({
        status: 200,
        type: [ProductResponseDto],
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
        type: ProductResponseDto,
    })
    
    @Get(':id')
    async findOneRegisterById(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @ApiOperation({ summary: 'Guardar nuevo registro' })
    @ApiBody({ type: ProductCreateDto })
    @ApiResponse({
        status: 200,
        description: 'Guarda un nuevo registro',
        type: ProductResponseDto,
    })

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(AnyFilesInterceptor(MulterConfig))
    async createNewRegister(@Body() dto: ProductCreateDto, @UploadedFiles() files: Express.Multer.File[]) {
        const coverFile = files.find(file => file.fieldname === 'cover');
        const wallpaperFile = files.find(file => file.fieldname === 'wallpaper');
        const screenshotFiles = files.filter(file => file.fieldname === 'screenshots');

         return await this.service.createNewRegister(dto, coverFile, wallpaperFile, screenshotFiles);
    }

    @ApiOperation({ summary: 'Actualiza un registro' })
    @ApiBody({ type: ProductCreateDto })
    @ApiParam({
        name: 'id',
        description: 'Identificador.',
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza un registro',
        type: ProductResponseDto,
    })
    
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id') 
    @UseInterceptors(FilesInterceptor('files', 20, MulterConfig))
    async updateRegister(@Body() dto: ProductCreateDto, id:number,
    @UploadedFiles() files: Express.Multer.File[] ) {
        const [coverFile, wallpaperFile, ...screenshotFiles] = files;
        return await this.service.updateRegister(dto, id, coverFile, wallpaperFile, screenshotFiles);
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
