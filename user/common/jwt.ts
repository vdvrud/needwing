import jwt from 'jsonwebtoken';

const createToken = async (data: any) => {
    const token = await jwt.sign(data, 'need_secret_wings', { expiresIn: 18000000 });
    return token
}

export { createToken }