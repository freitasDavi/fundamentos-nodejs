import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
	type: "postgres",
	host: "database_ignite", // Nome dado ao service do banco de dados
	port: 5432,
	username: "docker",
	password: "ignite",
	database: "rentx",
	synchronize: false,
	logging: false,
	entities: [],
	migrations: ["./src/database/migrations/*.ts"],
	subscribers: []
});

export function createConnection(host = "database_ignite"): Promise<DataSource> {
	return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;