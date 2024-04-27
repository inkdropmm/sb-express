import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	emailVerified: boolean
}
