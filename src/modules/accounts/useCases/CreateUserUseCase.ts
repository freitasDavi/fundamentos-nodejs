import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../database/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase  {

	constructor(
		@inject("UsersRepository")
		private readonly usersRepository: IUsersRepository
	) {} 

	async execute ({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists");
		}
		
		const passwordHash = await hash(password, 8);
		
		await this.usersRepository.create({
			name,
			driver_license,
			email,
			password: passwordHash
		});
	}
}

export  { CreateUserUseCase };