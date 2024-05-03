import type { Express, Request as Req, Response } from 'express'
import { Activity } from '../db/collections'

export default function requestRoutes(app: Express, baseUrl: string) {
	app.post(baseUrl + '/activity/invite', async (req: Req, res: Response) => {
		const { fromUserId, toUserId } = req.body
		const activity = await Activity.create({ fromUserId, toUserId, userIds: [fromUserId, toUserId] })
		return res.json(activity).end()
	})

	// app.post(baseUrl + '/activity/respond', async (req: Req, res: Response) => {
	// 	const { id, accept } = req.body
	// 	const activity = await Activity.findById(id)
	// 	if (activity) {
	// 		activity.accepted = accept
	// 		await activity.save()
	// 		Activity.create({})
	// 		res.end()
	// 	}
	// })
}
