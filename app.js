const express = require("express");
const app = express();

const crudController = require("./crudcontroller/routes");

const PORT = 8080;

app.use(express.json());

app.use("/routes", crudController);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
