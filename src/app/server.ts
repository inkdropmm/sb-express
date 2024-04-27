import express, { Express } from 'express'
import 'reflect-metadata'
import dotenv from 'dotenv'
import path from 'path'
import http from 'http'

import { bootSocket } from './socket'
import bootDbs from './db'
import bootRouter from './router'

async function startUp() {
	dotenv.config({ path: path.join(__dirname, '.env') }) // NOTE: need to specify path if .env is not at root dir

	const app: Express = express()
	const httpServer = http.createServer(app)

	await bootDbs()

	bootSocket(httpServer)
	bootRouter(app)

	app.get('/', (req, res) => res.send(`[server]: Server is running at http://localhost:${port}`))
	const port = process.env.PORT || 3000
	httpServer.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`)
	})
}

startUp()
