import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase  {

	constructor(
		@inject("UsersRepository")
		private readonly usersRepository: IUsersRepository
	) {}

	async execute ({ driver_license, email, name, password, username }: ICreateUserDTO): Promise<void> {
		await this.usersRepository.create({
			name,
			driver_license,
			email,
			password,
			username
		});
	}
}

export  { CreateUserUseCase };