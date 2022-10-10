import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../database/errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;
	
	if (!authHeader) {
		throw new AppError("Token missing", 401);
	}

	const [ , token] = authHeader.split(" ");

	try {
		const { sub : user_id } = verify(token, "8a87c26d7c25d62d830e1afa1c4abb33") as IPayload;

		const usersRepository = new UsersRepository();
		const user = usersRepository.findById(user_id);

		if(!user) {
			throw new AppError("User does not exists", 401);
		}

		next();	

	} catch (err) {
		throw new AppError("Inválid token", 401);
	}
}