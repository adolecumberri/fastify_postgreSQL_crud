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

const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

const findUsers = async () => {
    const user = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true,
        }
    });
    return user;
}

export {
    createUser,
    findUserByEmail,
    findUsers
}