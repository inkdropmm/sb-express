import express, { Express, Request, Response } from 'express'
import requestRoutes from './request'

const apiPath = '/api'

export default function bootRouter(app: Express) {
	// app.get('/', (req, res) => res.send(`[server]: Server is running at http://localhost:${port}`))
	app.use(express.json()) // NOTE: need to parse req.body
	requestRoutes(app, apiPath)
}
