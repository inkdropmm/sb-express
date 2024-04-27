import type { Express, Request, Response } from 'express'

const apiPath = '/api'

export default function requestRoutes(app: Express, baseUrl: string) {
	app.post(baseUrl + '/request/create', (req: Request, res: Response) => {
		console.log(req.body)
		res.end()
		// const { fromUserId, toUserId } = req.body
	})
	app.post(baseUrl + '/request/cancel', (req: Request, res: Response) => {
		const { id } = req.body
		res.end()
	})
}
