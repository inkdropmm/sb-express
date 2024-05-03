import { v4 as uuidv4 } from 'uuid'
import { Server } from 'socket.io'

// const SOCKET_CONNECTED_EVE = 'socket.connect'
// const SOCKET_DISCONNECTED_EVE = 'socket.disconnect'
const CHAT_EVE = 'chat'
const CHAT_MESSAGE_EVE = 'chat.message'
const CHAT_CONNECT_EVE = 'chat.connect'
const CHAT_DISCONNECT_EVE = 'chat.disconnect'

const chatSocket = (io: Server) => {
	io.of('/s/chat').on('connection', async (socket) => {
		// const chat = (await Chat.findById(socket.request.headers.chatid)) || new Chat()
		const auth = socket.handshake.auth
		const roomId = auth.roomId || socket.handshake.query.roomId
		socket.join(roomId)

		io.in(roomId)
			.fetchSockets()
			.then((sockets) => {
				const userIds = sockets.map((s) => s.handshake.auth.userId)
				socket.to(roomId).emit(CHAT_CONNECT_EVE, { userIds, type: CHAT_CONNECT_EVE })
			})

		socket.on(CHAT_MESSAGE_EVE, (msg) => {
			console.log('message: ' + msg)

			const obj = { id: uuidv4(), userId: socket.id, content: msg, createdAt: new Date().toISOString() }
			// socket.to(chat.id).emit(NEW_MESSAGE_EVE, obj)
			// socket.broadcast.to(chat.id).emit(NEW_MESSAGE_EVE, obj)

			socket.on('disconnect', () => {
				console.log('user disconnected')
				// socket.to(chat.id).emit(SOCKET_DISCONNECTED_EVE, 'user disconnected')
				// socket.broadcast.to(chat.id).emit(SOCKET_DISCONNECTED_EVE, 'user disconnected')
			})
		})
	})
}

export default chatSocket
