
import { FastifyInstance } from "fastify";
import registerUserHandler from "./user.controller";

const userRoutes = async (fastify: FastifyInstance, options: any) => {
    
    //el prefijo viene desde app.ts es api/user
    fastify.post('/', registerUserHandler);
}
export default userRoutes;