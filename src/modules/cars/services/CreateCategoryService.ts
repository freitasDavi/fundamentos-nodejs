import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
	name: string;
	description: string;
}

/*
	[x] Definir o tipo de retorno
	[x] Alterar o retorno de erro
	[x] Acessar o repositório
	[x] Retornar algo?
*/


class CreateCategoryService {

	// private categoriesRepository: CategoriesRepository;

	// constructor (private categoriesRepository: CategoriesRepository) {
	// 	this.categoriesRepository = categoriesRepository;
	// }

	// Esse de baixo é a mesma coisa que o de cima
	constructor (private categoriesRepository: ICategoriesRepository) {}

	execute ({ name, description }: IRequest): void {
		const categoryAlreadyExists = this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new Error("Category already exists");
		}
	
		this.categoriesRepository.create({ name, description });
	
	}

}

export { CreateCategoryService };