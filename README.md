## Taller Mecánico API

Dominio: Sistema backend para la gestión de un taller mecánico, permitiendo el registro de vehículos atendidos y la administración de mecánicos y órdenes de servicio.

## Requisitos
- Node.js versión 20 o superior

## Cómo correrlo
1. Clonar el repositorio git clone https://github.com/Backend-Programacion-5-UNIAJC/Taller_Mecanico_Backend.git
2. npm install
3. npm run dev
4. abrir http://localhost:3000

## Equipo

| Usuario de GitHub | Correo Institucional |
| :--- | :--- |
| **AlejandroCebM** | `alejandroceballos@estudiante.uniajc.edu.co` |
| **Edward Fernandez** | `ejosephfernanez@estudiante.uniajc.edu.co` |

## Matriz de permisos

| Endpoint | Público (sin token) | CLIENT | MECHANIC | ADMIN |
| :--- | :--- | :--- | :--- | :--- |
| `GET /service-orders` | Permitido | Permitido | Permitido | Permitido |
| `GET /service-orders/mios` | Denegado (`401`) | Permitido (propias) | Permitido (asignadas) | Permitido (todas) |
| `GET /service-orders/:id` | Permitido | Permitido | Permitido | Permitido |
| `POST /service-orders` | Denegado (`401`) | Denegado (`403`) | Permitido | Permitido |
| `PUT /service-orders/:id` | Denegado (`401`) | Denegado (`403`) | Solo dueño / asignado | Permitido |
| `DELETE /service-orders/:id` | Denegado (`401`) | Denegado (`403`) | Solo dueño / asignado | Permitido |
| `GET /mechanics` | Permitido | Permitido | Permitido | Permitido |
| `GET /mechanics/:id` | Permitido | Permitido | Permitido | Permitido |
| `POST /mechanics` | Denegado (`401`) | Denegado (`403`) | Denegado (`403`) | Permitido |
| `PUT /mechanics/:id` | Denegado (`401`) | Denegado (`403`) | Denegado (`403`) | Permitido |
| `DELETE /mechanics/:id` | Denegado (`401`) | Denegado (`403`) | Denegado (`403`) | Permitido |

## Catálogo de errores

Todas las respuestas de error de la API siguen una estructura JSON uniforme:

```json
{
  "error": {
    "code": "CODIGO_ERROR",
    "message": "Descripción legible del error"
  }
}
```

| HTTP | Code | Cuándo ocurre |
| :--- | :--- | :--- |
| `400` | `VALIDATION_ERROR` | El `body` o el parámetro `:id` no cumplen el esquema de validación Zod. Incluye `details` con cada campo y su mensaje |
| `400` | `INVALID_JSON` | El cuerpo (`body`) de la petición tiene un JSON mal formado |
| `401` | `TOKEN_MISSING` | No se envió el header `Authorization: Bearer <token>` |
| `401` | `TOKEN_INVALID` | El token JWT está vencido, alterado o tiene una firma inválida |
| `401` | `INVALID_CREDENTIALS` | El email o la contraseña son incorrectos al iniciar sesión (mismo mensaje en ambos casos) |
| `403` | `FORBIDDEN_ROLE` | El rol del usuario autenticado (`CLIENT`, `MECHANIC`, `ADMIN`) no tiene permisos para acceder a la ruta |
| `403` | `NOT_SERVICE_ORDER_OWNER` | Un `MECHANIC` intenta actualizar o eliminar una orden de servicio que no tiene asignada |
| `404` | `SERVICE_ORDER_NOT_FOUND` | La orden de servicio solicitada no existe |
| `404` | `MECHANIC_NOT_FOUND` | El mecánico solicitado no existe |
| `404` | `VEHICLE_NOT_FOUND` | El vehículo solicitado no existe |
| `404` | `USER_NOT_FOUND` | El usuario solicitado no existe |
| `404` | `NOT_FOUND` | Registro no encontrado en operaciones de Prisma (`P2025`) |
| `404` | `ROUTE_NOT_FOUND` | La ruta o método HTTP solicitado no existe en la API |
| `409` | `EMAIL_TAKEN` | Intento de registro con un correo electrónico que ya está en uso |
| `409` | `DUPLICATE` | Intento de crear o actualizar un registro con un valor único repetido, como placa de vehículo o email de mecánico (Prisma `P2002`) |
| `409` | `RELATION_CONFLICT` | Referencia a un registro relacionado que no existe (por ejemplo `vehicleId` o `mechanicId` inexistente) o intento de eliminar un registro del que dependen otros (Prisma `P2003`) |
| `500` | `INTERNAL_ERROR` | Error inesperado del servidor. El campo `stack` solo se incluye en desarrollo (`NODE_ENV !== "production"`) |
| `503` | `DATABASE_UNAVAILABLE` | La base de datos PostgreSQL no responde o no está disponible |