import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  obtenerActivos() {
    return this.productosService.obtenerActivos();
  }

  @Post()
  crear(@Body() crearProductoDto: CrearProductoDto) {
    return this.productosService.crear(crearProductoDto);
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() actualizarProductoDto: ActualizarProductoDto,
  ) {
    return this.productosService.actualizar(id, actualizarProductoDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.productosService.eliminar(id);
  }
}
