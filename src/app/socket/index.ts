import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import { Server } from 'socket.io'

const NEW_MESSAGE_EVE = 'chat.message'

export const bootSocket = (httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
	const io = new Server(httpServer, {
		cors: {
			origin: ['http://localhost:8081'],
		},
	})

	io.on('connection', (socket) => {
		console.log('a user connected', socket.id)
		// socket.broadcast.emit(socket.id, ' connected')
		// socket.join('flower')

		socket.on(NEW_MESSAGE_EVE, (msg) => {
			console.log('message: ' + msg)
			// socket.to('flower').emit('chat message', msg)
			const obj = { id: uuidv4(), userId: socket.id, content: msg, createdAt: new Date().toISOString() }
			socket.emit(NEW_MESSAGE_EVE, obj)
			socket.broadcast.emit(NEW_MESSAGE_EVE, obj)
		})
	})
}
