
import { FastifyInstance } from "fastify";
import registerUserHandler from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (fastify: FastifyInstance, options: any) => {
    
    //el prefijo viene desde app.ts es api/user
    //el middleware de schema se añade al crearse el server. sino el for of no podría usarse.
    fastify.post('/',{
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema'),
            },
        }
    }, registerUserHandler);
}
export default userRoutes;