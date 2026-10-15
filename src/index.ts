import express from 'express';
import mechanicRoutes from './routes/mechanic.route';
//import serviceOrderRoutes from './routes/serviceOrder.routes';
//import vehicleRoutes from './routes/vehicle.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Taller Mecanico funcionando correctamente');
});

app.use('/mechanics', mechanicRoutes);
//app.use('/serviceOrders', serviceOrderRoutes);
//app.use('/vehicles', vehicleRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});