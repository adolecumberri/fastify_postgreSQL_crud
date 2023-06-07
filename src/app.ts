import Fastify from 'fastify';

import userRoutes from './modules/user/user.routes';

const server = Fastify();

server.get('/', async () => {
    return { status: 'OK' };
});

async function start() {

    server.register( userRoutes, {
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