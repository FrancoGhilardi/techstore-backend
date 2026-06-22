import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  marca!: string;

  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @IsMongoId()
  categoriaId!: string;

  @IsNumber()
  @Min(0)
  precio!: number;

  @IsOptional()
  @IsString()
  moneda?: string;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  imagenes?: string[];

  @IsOptional()
  @IsObject()
  especificaciones?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  etiquetas?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  valoracionPromedio?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadResenias?: number;
}
