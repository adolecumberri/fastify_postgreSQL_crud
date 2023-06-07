import Fastify from 'fastify';

const server = Fastify();

server.get('/', async () => {
    return { status: 'OK' };
});

async function start() {
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