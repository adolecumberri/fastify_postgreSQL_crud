//esto lo hace el tutorial que estoy siguiendo.
//no es tal vez lo que yo haría en un proyecto real.
//pero es lo que hay.
// si estais leyendo un comentario en un archivo de utilidades
// gracias.... ? :)

import crypto from 'crypto';

export const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt,
        hash
    };
}

export const verifyPassword = (
    password: string,
    hash: string,
    salt: string
) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return hash === hashVerify;
}