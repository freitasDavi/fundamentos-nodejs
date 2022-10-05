import express from "express";
import { categoriesRotues } from "./routes/categories.routes";

const app = express();

app.use(express.json());
app.use("/categories", categoriesRotues);

app.get("/", (request, response) => response.send("hello world"));

app.listen(3333, () => console.log("Rodando na porta 3333")); 