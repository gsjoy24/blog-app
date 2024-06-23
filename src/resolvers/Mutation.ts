import bcrypt from 'bcrypt';
import jwtHelpers from '../utils/jwtHelpers';
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

const Mutation = {
	signUp: async (parent: any, args: TUser, { prisma }: any) => {
		const isUserExist = await prisma.user.findUnique({
			where: { email: args.email }
		});
		if (isUserExist) {
			throw new Error('User already exist');
		}

		const password = await bcrypt.hash(args.password, 12);
		const user = await prisma.$transaction(async (tx: any) => {
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

		const token = jwtHelpers.generateToken({ userId: user.id, name: user.name, email: user.email });

		return {
			token
		};
	},

	signIn: async (parent: any, args: TUser, { prisma }: any) => {
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
		const token = jwtHelpers.generateToken({ userId: user.id, name: user.name, email: user.email });
		return {
			token
		};
	},

	createPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
		if (!userInfo) {
			throw new Error('Unauthorized');
		}
		const user = await prisma.user.findUnique({
			where: { id: userInfo.userId }
		});
		if (!user) {
			throw new Error('User not found');
		}
		const post = await prisma.post.create({
			data: {
				title: args.title,
				content: args.content,
				published: true,
				authorId: userInfo.userId
			}
		});
		return post;
	}
};

export default Mutation;
