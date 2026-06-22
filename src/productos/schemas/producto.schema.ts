import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({
  collection: 'productos',
  versionKey: false,
  timestamps: {
    createdAt: 'creadoEn',
    updatedAt: 'actualizadoEn',
  },
})
export class Producto {
  @Prop({ required: true, unique: true, trim: true })
  sku!: string;

  @Prop({ required: true, trim: true })
  nombre!: string;

  @Prop({ required: true })
  descripcion!: string;

  @Prop({ required: true, trim: true })
  marca!: string;

  @Prop({ required: true, trim: true })
  modelo!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  categoriaId!: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  precio!: number;

  @Prop({ required: true, default: 'ARS' })
  moneda!: string;

  @Prop({ required: true, min: 0, default: 0 })
  stock!: number;

  @Prop({ type: [String], default: [] })
  imagenes!: string[];

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: {},
  })
  especificaciones!: Record<string, unknown>;

  @Prop({ type: [String], default: [] })
  etiquetas!: string[];

  @Prop({ default: 0, min: 0, max: 5 })
  valoracionPromedio!: number;

  @Prop({ default: 0, min: 0 })
  cantidadResenias!: number;

  @Prop({ default: true })
  activo!: boolean;

  @Prop({ type: Date, default: null })
  eliminadoEn!: Date | null;

  creadoEn!: Date;

  actualizadoEn!: Date;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
