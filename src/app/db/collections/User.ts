import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
	username: String,
	name: String,
	email: String,
	createdAt: Date,
	updatedAt: Date,
	deletedAt: Date,
})

const User = model('user', UserSchema)

export default User
