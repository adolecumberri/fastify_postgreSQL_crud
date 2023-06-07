import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserSchema, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import server from "../../app";

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

const loginHandler = async (request: FastifyRequest<{
    Body: LoginInput
}>, reply: FastifyReply
) => {
    const body = request.body;

    //find user by email
    const user = await findUserByEmail(body.email);

    if(!user) {
        return reply.code(404).send({ message: 'User not found. Invalid Email or Password.' });
    }

    //compare password
    const isPasswordValid = verifyPassword({
        passwordToVerify: body.password,
        salt: user.salt,
        hash: user.password
    })

    if(isPasswordValid) {
        const { password, salt, ...rest} = user;
        return {
            accessToken: server.jwt.sign(rest)
        }
    }
    //generate token

    //return token
    return reply.send(body);
}

const getUsershandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await findUsers();
    return users;
}

export {
    registerUserHandler,
    loginHandler,
    getUsershandler
};