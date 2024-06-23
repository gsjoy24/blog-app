import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { JwtPayload } from 'jsonwebtoken';
import resolvers from './resolvers';
import typeDefs from './schema';
import jwtHelpers from './utils/jwtHelpers';

const prisma = new PrismaClient();
type Context = {
	prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
	userInfo: string | JwtPayload | null;
};

const main = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		context: async ({ req }): Promise<Context> => {
			const token = req.headers.authorization;
			const userInfo = token ? await jwtHelpers.decodeToken(token as string) : null;
			return { prisma, userInfo };
		}
	});

	console.log(`🚀  Server ready at: ${url}`);
};

main();
