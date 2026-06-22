import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
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

  async actualizar(id: string, actualizarProductoDto: ActualizarProductoDto) {
    const productoActualizado = await this.productoModel
      .findOneAndUpdate(
        {
          _id: id,
          activo: true,
          eliminadoEn: null,
        },
        {
          $set: actualizarProductoDto,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .lean()
      .exec();

    if (!productoActualizado) {
      throw new NotFoundException(
        `No se encontró un producto activo con el id ${id}`,
      );
    }

    return productoActualizado;
  }

  async eliminar(id: string) {
    const productoEliminado = await this.productoModel
      .findOneAndUpdate(
        {
          _id: id,
          activo: true,
          eliminadoEn: null,
        },
        {
          $set: {
            activo: false,
            eliminadoEn: new Date(),
          },
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .lean()
      .exec();

    if (!productoEliminado) {
      throw new NotFoundException(
        `No se encontró un producto activo con el id ${id}`,
      );
    }

    return productoEliminado;
  }
}
