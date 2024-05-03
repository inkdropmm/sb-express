import { Server } from 'socket.io'
import { Activity } from '../db/collections'

const ACTIVITY_EVE = 'activity'
const ACTIVITY_INVITE_EVE = 'activity.invite'
const ACTIVITY_ACCEPT_EVE = 'activity.accept'
const ACTIVITY_REJECT_EVE = 'activity.reject'

const activitySocket = (io: Server) => {
	io.of('/s/activity').on('connection', async (socket) => {
		// console.log('a user connected', socket.id, socket.handshake.auth.userId || socket.handshake.headers.user_id)
		socket.join(socket.handshake.auth.userId || socket.handshake.headers.user_id)
		// console.log('joined rooms', socket.rooms)

		socket.on(ACTIVITY_INVITE_EVE, async (activityInvite, respondBack) => {
			// console.log('activityInvite', activityInvite)

			const activity = await Activity.create({
				fromUserId: activityInvite.fromUserId,
				toUserId: activityInvite.toUserId,
				userIds: [activityInvite.fromUserId, activityInvite.toUserId],
				accepted: null,
			})

			const invitation = { id: activity.id, type: ACTIVITY_INVITE_EVE }
			socket.to(activityInvite.toUserId).emit(ACTIVITY_EVE, invitation)
			respondBack(invitation)
		})

		socket.on(ACTIVITY_ACCEPT_EVE, async (invitation) => {
			const activity = await Activity.findById(invitation.id)
			if (!activity) return

			activity.accepted = true
			socket.to(activity.fromUserId?.toString() as string).emit(ACTIVITY_EVE, { ...invitation, type: ACTIVITY_ACCEPT_EVE, accepted: activity.accepted })
			await activity.save()
		})

		socket.on(ACTIVITY_REJECT_EVE, async (invitation) => {
			const activity = await Activity.findById(invitation.id)
			if (!activity) return

			activity.accepted = false
			activity.deletedAt = new Date()
			socket.to(activity.fromUserId?.toString() as string).emit(ACTIVITY_EVE, { ...invitation, type: ACTIVITY_ACCEPT_EVE, accepted: activity.accepted })
			await activity.save()
		})
	})
}

export default activitySocket
