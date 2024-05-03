import { model, Schema } from 'mongoose'

const ActivitySchema = new Schema(
	{
		userIds: [{ type: Schema.Types.String, ref: 'User' }],
		fromUserId: { type: Schema.Types.String, ref: 'User' },
		toUserId: { type: Schema.Types.String, ref: 'User' },
		accepted: { type: Schema.Types.Boolean, default: null },
		// createdAt: Schema.Types.Date,
		// updatedAt: Schema.Types.Date,
		deletedAt: Schema.Types.Date,
		archivedAt: Schema.Types.Date,
	},
	{ timestamps: true }
)

const Activity = model('Activity', ActivitySchema)

export default Activity
