import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserSchema } from "./user.schema";

const registerUserHandler = async (
    request: FastifyRequest<{
        Body: CreateUserSchema
    }>,
    reply: FastifyReply
) => {
    const body = request.body;

    try {
        const user = await createUser(body);

        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send({ e })
    }
}

export default registerUserHandler;