import { model, Schema } from 'mongoose'

const RequestSchema = new Schema({
	fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
	toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: Date,
	updatedAt: Date,
	deletedAt: Date,
})

const Request = model('request', RequestSchema)

export default Request
