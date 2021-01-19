import jwt from 'jsonwebtoken';
import { AdminDoc, AdminType } from '../src/interfaces/models_interfaces';
import { mongoose } from './mongo';

interface token {
    _id: mongoose.Types.ObjectId, 
    email: string, 
    user_type: AdminType, 
    contact: string, 
    email_verified: boolean
}

const createToken = async (data: token) => {
    const token = await jwt.sign(data, 'need_secret_wings', { expiresIn: 18000000 });
    return token
}

export { createToken }