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