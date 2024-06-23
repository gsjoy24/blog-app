import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
type TUser = {
	id?: string;
	email: string;
	name: string;
	bio?: string;
	password: string;
	createdAt?: string;
	updatedAt?: string;
	role?: string;
	posts?: any[];
	profile?: any;
};

const prisma = new PrismaClient();
const resolvers = {
	Query: {
		// me: async (parent: any, args: any, context: any) => {
		// 	return await prisma.user.findUnique({
		// 		where: { id: context.userId }
		// 	});
		// }
		users: async (parent: any, args: any, context: any) => {
			return await prisma.user.findMany();
		}
	},
	Mutation: {
		signUp: async (parent: any, args: TUser, context: any) => {
			const isUserExist = await prisma.user.findUnique({
				where: { email: args.email }
			});
			if (isUserExist) {
				throw new Error('User already exist');
			}

			const password = await bcrypt.hash(args.password, 12);
			const user = await prisma.$transaction(async (tx) => {
				const user = await tx.user.create({
					data: {
						email: args.email,
						name: args.name,
						password
					}
				});
				await tx.profile.create({
					data: {
						userId: user.id,
						bio: args.bio
					}
				});

				return user;
			});

			const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, config.jwtSecret, {
				expiresIn: '1d'
			});
			console.log(token);

			return {
				token
			};
		},

		signIn: async (parent: any, args: TUser, context: any) => {
			const user = await prisma.user.findUnique({
				where: { email: args.email }
			});
			if (!user) {
				throw new Error('User not found');
			}
			const valid = await bcrypt.compare(args.password, user.password);
			if (!valid) {
				throw new Error('Invalid password');
			}
			const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, config.jwtSecret, {
				expiresIn: '1d'
			});
			return {
				token
			};
		}
	}
};

export default resolvers;
