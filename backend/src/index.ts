import express from 'express';
import dotenv from 'dotenv';
import rideRoutes from './routes/rideRoutes';

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api', rideRoutes);

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
