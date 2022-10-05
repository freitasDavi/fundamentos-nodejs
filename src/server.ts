import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => response.send("hello world"));

app.listen(3333, () => console.log("Rodando na porta 3333")); 