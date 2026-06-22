import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
