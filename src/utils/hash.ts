//esto lo hace el tutorial que estoy siguiendo.
//no es tal vez lo que yo haría en un proyecto real.
//pero es lo que hay.
// si estais leyendo un comentario en un archivo de utilidades
// gracias.... ? :)

import crypto from 'crypto';

const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt,
        hash
    };
}

const verifyPassword = ({
    passwordToVerify,
    hash,
    salt
}: {
    passwordToVerify: string,
    hash: string,
    salt: string
}) => {
    const hashVerify = crypto.pbkdf2Sync(passwordToVerify, salt, 10000, 64, 'sha512')
        .toString('hex');

    return hash === hashVerify;
}

export {
    hashPassword,
    verifyPassword
}