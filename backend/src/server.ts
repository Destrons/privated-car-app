import { createConnection } from "typeorm";
import app from "./app";

createConnection()
  .then(() => {
    console.log("Connected to the database");
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  })
  .catch((error) => console.log(error));
