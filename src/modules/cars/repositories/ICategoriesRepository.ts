import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Category;
	list(): Category[];
	create(ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO};