# TechStore Backend

API REST desarrollada con **NestJS** y **MongoDB** para gestionar el catálogo de productos de una tienda de tecnología. Permite crear, listar, actualizar y eliminar productos de forma lógica (soft delete).

---

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) v8 o superior
- Una base de datos **MongoDB** (local o Atlas)

---

## Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:

```env
MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/techstore?retryWrites=true&w=majority
PORT=3000
MONGODB_DB_NAME_TABLE=techstore
```

---

## Pasos para levantar el proyecto

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar en modo desarrollo (con hot reload)
pnpm run start:dev

# 3. O bien levantar en modo producción
pnpm run build
pnpm run start:prod
```

La API quedará disponible en `http://localhost:3000`.

---

## Endpoints de Productos

Base URL: `/productos`

---

### GET /productos

Retorna todos los productos activos, ordenados por fecha de creación descendente.

**Ejemplo de llamada:**

```
GET http://localhost:3000/productos
```

**Ejemplo de respuesta:**

```json
[
  {
    "_id": "6657c3a2f1e4a2b3c4d5e6f7",
    "sku": "LAP-001",
    "nombre": "Laptop Lenovo IdeaPad 3",
    "descripcion": "Laptop para uso general con procesador AMD Ryzen 5",
    "marca": "Lenovo",
    "modelo": "IdeaPad 3",
    "categoriaId": "6657c3a2f1e4a2b3c4d5e600",
    "precio": 850000,
    "moneda": "ARS",
    "stock": 15,
    "imagenes": ["https://ejemplo.com/imagen1.jpg"],
    "especificaciones": {
      "ram": "8GB",
      "almacenamiento": "512GB SSD"
    },
    "etiquetas": ["laptop", "amd", "oferta"],
    "valoracionPromedio": 4.5,
    "cantidadResenias": 12,
    "activo": true,
    "eliminadoEn": null,
    "creadoEn": "2025-06-01T10:00:00.000Z",
    "actualizadoEn": "2025-06-01T10:00:00.000Z"
  }
]
```

---

### POST /productos

Crea un nuevo producto.

**Ejemplo de llamada:**

```
POST http://localhost:3000/productos
Content-Type: application/json
```

**Body requerido:**

```json
{
  "sku": "LAP-001",
  "nombre": "Laptop Lenovo IdeaPad 3",
  "descripcion": "Laptop para uso general con procesador AMD Ryzen 5",
  "marca": "Lenovo",
  "modelo": "IdeaPad 3",
  "categoriaId": "6657c3a2f1e4a2b3c4d5e600",
  "precio": 850000,
  "stock": 15,
  "moneda": "ARS",
  "imagenes": ["https://ejemplo.com/imagen1.jpg"],
  "especificaciones": {
    "ram": "8GB",
    "almacenamiento": "512GB SSD"
  },
  "etiquetas": ["laptop", "amd"]
}
```

> Los campos `moneda`, `imagenes`, `especificaciones`, `etiquetas`, `valoracionPromedio` y `cantidadResenias` son opcionales.

**Ejemplo de respuesta:**

```json
{
  "_id": "6657c3a2f1e4a2b3c4d5e6f7",
  "sku": "LAP-001",
  "nombre": "Laptop Lenovo IdeaPad 3",
  "descripcion": "Laptop para uso general con procesador AMD Ryzen 5",
  "marca": "Lenovo",
  "modelo": "IdeaPad 3",
  "categoriaId": "6657c3a2f1e4a2b3c4d5e600",
  "precio": 850000,
  "moneda": "ARS",
  "stock": 15,
  "imagenes": ["https://ejemplo.com/imagen1.jpg"],
  "especificaciones": {
    "ram": "8GB",
    "almacenamiento": "512GB SSD"
  },
  "etiquetas": ["laptop", "amd"],
  "valoracionPromedio": 0,
  "cantidadResenias": 0,
  "activo": true,
  "eliminadoEn": null,
  "creadoEn": "2025-06-01T10:00:00.000Z",
  "actualizadoEn": "2025-06-01T10:00:00.000Z"
}
```

---

### PATCH /productos/:id

Actualiza parcialmente un producto activo. Solo se actualizan los campos enviados en el body.

**Ejemplo de llamada:**

```
PATCH http://localhost:3000/productos/6657c3a2f1e4a2b3c4d5e6f7
Content-Type: application/json
```

**Body (todos los campos son opcionales):**

```json
{
  "precio": 900000,
  "stock": 10,
  "etiquetas": ["laptop", "amd", "oferta"]
}
```

**Ejemplo de respuesta:**

```json
{
  "_id": "6657c3a2f1e4a2b3c4d5e6f7",
  "sku": "LAP-001",
  "nombre": "Laptop Lenovo IdeaPad 3",
  "descripcion": "Laptop para uso general con procesador AMD Ryzen 5",
  "marca": "Lenovo",
  "modelo": "IdeaPad 3",
  "categoriaId": "6657c3a2f1e4a2b3c4d5e600",
  "precio": 900000,
  "moneda": "ARS",
  "stock": 10,
  "imagenes": ["https://ejemplo.com/imagen1.jpg"],
  "especificaciones": {
    "ram": "8GB",
    "almacenamiento": "512GB SSD"
  },
  "etiquetas": ["laptop", "amd", "oferta"],
  "valoracionPromedio": 4.5,
  "cantidadResenias": 12,
  "activo": true,
  "eliminadoEn": null,
  "creadoEn": "2025-06-01T10:00:00.000Z",
  "actualizadoEn": "2025-06-22T15:30:00.000Z"
}
```

> Retorna `404 Not Found` si el producto no existe o ya fue eliminado.

---

### DELETE /productos/:id

Realiza una eliminación lógica del producto (soft delete). El producto queda marcado como inactivo con una fecha de eliminación, pero no se borra de la base de datos.

**Ejemplo de llamada:**

```
DELETE http://localhost:3000/productos/6657c3a2f1e4a2b3c4d5e6f7
```

**Ejemplo de respuesta:**

```json
{
  "_id": "6657c3a2f1e4a2b3c4d5e6f7",
  "sku": "LAP-001",
  "nombre": "Laptop Lenovo IdeaPad 3",
  "descripcion": "Laptop para uso general con procesador AMD Ryzen 5",
  "marca": "Lenovo",
  "modelo": "IdeaPad 3",
  "categoriaId": "6657c3a2f1e4a2b3c4d5e600",
  "precio": 900000,
  "moneda": "ARS",
  "stock": 10,
  "imagenes": ["https://ejemplo.com/imagen1.jpg"],
  "especificaciones": {
    "ram": "8GB",
    "almacenamiento": "512GB SSD"
  },
  "etiquetas": ["laptop", "amd", "oferta"],
  "valoracionPromedio": 4.5,
  "cantidadResenias": 12,
  "activo": false,
  "eliminadoEn": "2025-06-22T16:00:00.000Z",
  "creadoEn": "2025-06-01T10:00:00.000Z",
  "actualizadoEn": "2025-06-22T16:00:00.000Z"
}
```

> Retorna `404 Not Found` si el producto no existe o ya fue eliminado.
