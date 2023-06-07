import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt'
import userRoutes from './modules/user/user.routes';
import { userSchemas } from './modules/user/user.schema';

const server = Fastify();

declare module 'fastify' {
    interface FastifyInstance {
        auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    }
}

server.register(fastifyJwt, {
    secret: 'bruh_what_a_morning',
});


server.decorate(
'auth', 
async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        return reply.send(err);
    }
});

server.get('/', async () => {
    return { status: 'OK' };
});

async function start() {

    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoutes, {
        prefix: 'api/users'
    })


    try {
        //0.0.0.0 seen in a tutorial. for Docker connections.
        await server.listen({
            port: 3000,
            host: '0.0.0.0'
        });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start()

export default server;