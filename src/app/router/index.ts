import type { Express, Request, Response } from 'express'
import requestRoutes from './request'

const apiPath = '/api'

export default function bootRouter(app: Express) {
	// app.get('/', (req, res) => res.send(`[server]: Server is running at http://localhost:${port}`))
	requestRoutes(app, apiPath)
}
