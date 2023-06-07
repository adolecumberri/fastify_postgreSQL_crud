import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt'
import userRoutes from './modules/user/user.routes';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoutes from './modules/product/product.routes';

const server = Fastify();

//giving global scope to auth.
declare module 'fastify' {
    interface FastifyInstance {
        auth: any
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            email: string,
            id: number,
            name: string
        }
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

    /* SCHEMAS */
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }

    /* ROUTES */
    server.register(userRoutes, {
        prefix: 'api/users'
    });
    server.register(productRoutes, {
        prefix: 'api/products'
    });


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