import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
//import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", async (request, response) => {
	return await listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), async (request, response) => {
	return await importCategoryController().handle(request, response);
});

export { categoriesRoutes };