import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string,
		email: string
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {

	constructor(
		@inject("UsersRepository")
		private readonly usersRepository: IUsersRepository
	){}

	async execute ({ email, password }: IRequest): Promise<IResponse> {
		// Usuario existe?
		const user = await this.usersRepository.findByEmail(email);
		
		if (!user) {
			throw new Error("Email or password incorrect!");
		}

		//Senha está correta?
		const passwordMatch = compare(password, user.password);
	
		if (!passwordMatch) {
			throw new Error("Email or password incorrect!");
		}

		// Gerar token
		const token = sign({}, "8a87c26d7c25d62d830e1afa1c4abb33", {
			subject: user.id,
			expiresIn: "1d"
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				email: user.email,
				name: user.name
			}
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };