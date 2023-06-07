
import { FastifyInstance } from "fastify";
import { registerUserHandler, loginHandler, getUsershandler } from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance, options: any) => {

    //el prefijo viene desde app.ts es api/user
    //el middleware de schema se añade al crearse el server. sino el for of no podría usarse.
    server.post('/', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema'),
            },
        }
    }, registerUserHandler);

    server.post('/login',
        {
            schema: {
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema')
                },

            }
        },
        loginHandler)

    server.get('/',
        {
            preHandler: [server.auth],
        },
        getUsershandler)

}
export default userRoutes;