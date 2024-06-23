import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
type TUser = {
	id?: string;
	email: string;
	name: string;
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
			const password = await bcrypt.hash(args.password, 12);
			const user = await prisma.user.create({
				data: {
					name: args.name,
					email: args.email,
					password
				}
			});

			return user;
		}
	}
};

export default resolvers;
