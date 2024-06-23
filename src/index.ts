import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import resolvers from './resolvers';
import typeDefs from './schema';

const prisma = new PrismaClient();
type Context = { prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> };

const main = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		context: async (): Promise<Context> => ({ prisma })
	});

	console.log(`🚀  Server ready at: ${url}`);
};

main();
