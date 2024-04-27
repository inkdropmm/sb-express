import { model, Schema } from 'mongoose'

const ActivitySchema = new Schema({
	createdAt: Date,
	updatedAt: Date,
	deletedAt: Date,
	archivedAt: Date,
})

const Activity = model('Activity', ActivitySchema)

export default Activity
