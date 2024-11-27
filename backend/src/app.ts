import express from "express";
import { getDrivers, calculateCost } from "./controllers/driverController";

const app = express();
app.use(express.json());

app.get("/drivers", getDrivers);
app.post("/calculate-cost", calculateCost);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
