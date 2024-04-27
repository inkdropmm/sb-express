import { model, Schema } from 'mongoose'

const ChatSchema = new Schema({
	userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	messages: [{ content: String, createdAt: Date }],
	createdAt: Date,
	deletedAt: Date,
	archivedAt: Date,
})

const chat = model('chat', ChatSchema)

export default chat
