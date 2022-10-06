import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
export class ImportCategoryUseCase {	

	public constructor (
		@inject("CategoriesRepository")
		private readonly categoriesRepository: ICategoriesRepository
	) {}

	async loadCategories (file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = []; 

			const stream = fs.createReadStream(file.path);
	
			const parseFile = parse();
	
			stream.pipe(parseFile);
	
			parseFile.on("data", async (line) =>  {
				const [name, description] = line;
	
				categories.push({
					name,
					description
				});
	
			})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (error) => {
					reject(error);
				});
	
		});
	}

	async execute (file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const existCategory = await this.categoriesRepository.findByName(name);

			if (!existCategory) {
				await this.categoriesRepository.create({
					name,
					description
				});
			}

		});
	}

}
