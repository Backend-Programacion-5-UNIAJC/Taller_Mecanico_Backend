import 'dotenv/config';
import express from 'express';
import mechanicRoutes from './routes/mechanic.route';
import serviceOrderRoutes from './routes/serviceOrder.routes';
import vehicleRoutes from './routes/vehicle.routes';
import authRoutes from './routes/auth.routes';
import { notFoundMiddleware, errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Taller Mecanico funcionando correctamente');
});

app.use('/auth', authRoutes)
app.use('/mechanics', mechanicRoutes);
app.use('/serviceOrders', serviceOrderRoutes);
app.use('/vehicles', vehicleRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});