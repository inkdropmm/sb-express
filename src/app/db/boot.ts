import { DataSource } from 'typeorm'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'express',
	synchronize: true,
	logging: false,
	entities: [User],
	subscribers: [],
	migrations: [],
})

AppDataSource.initialize().then(() => {
	console.log('db pg is ready :)...')
})
