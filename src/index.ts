import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import resolvers from './resolvers';
import typeDefs from './schema';

const prisma = new PrismaClient();

const main = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		context: async () => ({ prisma })
	});

	console.log(`🚀  Server ready at: ${url}`);
};

main();
