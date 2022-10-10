import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
	
	private repositorio : Repository<User>;

	public constructor () {
		this.repositorio = getRepository(User);
	}

	async create({ driver_license, email, name, password, avatar, id }: ICreateUserDTO): Promise<void> {
		const user = this.repositorio.create({
			name,
			email,
			password,
			driver_license,
			avatar,
			id
		});

		await this.repositorio.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repositorio.findOne({
			email
		});

		return user;
		
	}

	async findById(id: string): Promise<User> {
		const user = await this.repositorio.findOne(id);

		return user;
	}
}

export { UsersRepository };