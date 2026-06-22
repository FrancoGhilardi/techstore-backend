import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { Producto, ProductoDocument } from './schemas/producto.schema';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<ProductoDocument>,
  ) {}

  async obtenerActivos() {
    return this.productoModel
      .find({
        activo: true,
        eliminadoEn: null,
      })
      .sort({ creadoEn: -1 })
      .lean()
      .exec();
  }

  async crear(crearProductoDto: CrearProductoDto) {
    return this.productoModel.create({
      ...crearProductoDto,
      activo: true,
      eliminadoEn: null,
    });
  }
}
