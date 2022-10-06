import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
	
	private repositorio : Repository<User>;

	public constructor () {
		this.repositorio = getRepository(User);
	}

	async create({ driver_license, email, name, password, username }: ICreateUserDTO): Promise<void> {
		const user = this.repositorio.create({
			name,
			email,
			password,
			username,
			driver_license
		});

		await this.repositorio.save(user);
	}

}

export { UsersRepository };