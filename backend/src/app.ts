import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente

import { calculateCost } from './controllers/driverController';

const app = express();
app.use(express.json());

app.post("/calculate-cost", calculateCost);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
