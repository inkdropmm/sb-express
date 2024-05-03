import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import { Server } from 'socket.io'
import { Activity, Chat } from '../db/collections'
import activitySocket from './activity.socket'
import chatSocket from './chat.socket'

export const bootSocket = (httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
	const io = new Server(httpServer, {
		cors: {
			origin: ['http://localhost:8081'],
		},
	})

	// TODO: use socket.data
	// const chat = (await Chat.findById(socket.request.headers.chatid)) || new Chat()
	// socket.emit(CHAT_JOINED_EVE, 'you are now connected to chat ' + chat.id)
	// chat.save()

	// socket.broadcast.to(chat.id).emit(SOCKET_CONNECTED_EVE, 'a user connected ' + socket.id)

	// socket.on(NEW_MESSAGE_EVE, (msg) => {
	// 	console.log('message: ' + msg)

	// 	const obj = { id: uuidv4(), userId: socket.id, content: msg, createdAt: new Date().toISOString() }
	// 	// socket.to(chat.id).emit(NEW_MESSAGE_EVE, obj)
	// 	socket.broadcast.to(chat.id).emit(NEW_MESSAGE_EVE, obj)

	// 	socket.on('disconnect', () => {
	// 		console.log('user disconnected')
	// 		// socket.to(chat.id).emit(SOCKET_DISCONNECTED_EVE, 'user disconnected')
	// 		socket.broadcast.to(chat.id).emit(SOCKET_DISCONNECTED_EVE, 'user disconnected')
	// 	})
	// })

	activitySocket(io)
	chatSocket(io)
}
