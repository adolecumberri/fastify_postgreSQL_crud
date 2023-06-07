import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

const createUser = async (userData: CreateUserSchema) => {

    const { password, ...rest } = userData;

    const { salt, hash } = hashPassword(password);

    const createdUser = await prisma.user.create({ 
        data: {
            ...rest,
            salt,
            password: hash,
        } 
    });
    return createdUser;
}

export {
    createUser
}