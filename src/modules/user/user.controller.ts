import { FastifyReply, FastifyRequest } from "fastify";

const registerUserHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
    ) => {
    return { status: 'OK' };
}

export default registerUserHandler;