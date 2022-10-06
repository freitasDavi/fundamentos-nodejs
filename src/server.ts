import express from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

// Database
import "reflect-metadata";
import "./database";

const app = express();

app.use(express.json());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => response.send("hello world"));

app.listen(3333, () => console.log("Rodando na porta 3333")); 