// import { DataSource } from 'typeorm'
// import { User } from './entities/User'
import mongoose from 'mongoose'
import { User } from './collections'

mongoose.model.prototype.findOrCreate = async function (filter: any, data: any) {}

export default async function bootDbs() {
	mongoose
		.connect(process.env.MONGODB_URI as string)
		.then(() => {
			console.log('db mongo is ready :)...')
			// User.create({ username: 'sawako', email: 'sawako@fmtu.com', name: 'Sawako' })
			// User.create({ username: 'zayar', email: 'zayar@fmtu.com', name: 'Zayar' })
		})
		.catch((err) => {
			console.log(err)
		})
}

// export const AppDataSource = new DataSource({
// 	type: 'mysql',
// 	host: 'localhost',
// 	port: 3306,
// 	username: 'root',
// 	password: '',
// 	database: 'express',
// 	synchronize: true,
// 	logging: false,
// 	entities: [User],
// 	subscribers: [],
// 	migrations: [],
// })

// AppDataSource.initialize().then(() => {
// 	console.log('db pg is ready :)...')
// })
