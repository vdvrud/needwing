import express, { Request, Response } from 'express';
const router = express.Router();
import { check } from 'express-validator';
import { validationError } from '../../../common/validation';
import { createResponse, response } from '../../../common/response';
import { comparePassword, hashPassword } from '../../../common/password-methods';
import { createToken } from '../../../common/jwt';
import { Admin } from '../../models/admin';
import { AdminDoc, AdminType } from '../../interfaces/models_interfaces';
import { publishCreateUser } from '../../nats-events/pubs/user-created-pub';
import { client } from '../../nats-wrapper';
import { Subjects } from '../../nats-events/subjects';

router.get('/t/test', (req, res) => {
    res.send('working')
})

router.post('/existingAdmin', [
    check('email')
    .isEmail(),
    validationError
], async(req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const admins = await Admin.aggregate([
            {
                $match: {
                    email
                }
            }
        ]);
        const admin: AdminDoc = admins[0];
        response(res, 200, createResponse(admin));
    } catch (error) {
        console.log(error, 'Error in checking existing details !');
        response(res, 500, createResponse('Error in checking existing details !'));
    }
});

router.post('/createAdmin', [
    check('email', 'Email not valid')
    .isEmail(),
    check('password', 'Password should be atleast 8 characters and max 16 characters')
    .isLength({ min: 8, max: 16 }),
    check('c_password', 'Passwords doest not match !')
    .isLength({ min: 8, max: 16 }),
    validationError
], async(req: Request, res: Response) => {
    try {
        const { email, password, c_password } = req.body;
        if(password !== c_password) {
            return response(res, 400, createResponse('Passwords does not match !'))
        }
        const exist = await Admin.aggregate([
            {
                $match: {
                    email
                }
            }
        ]);
        if(exist[0]) {
            return response(res, 400, createResponse('Email already exist !'))
        }
        const hashed: string = await hashPassword(password);
        const newAdmin = {
            email, password: hashed
        }
        const created = await new Admin(newAdmin).save();
        publishCreateUser(client(), Subjects.UserCreated, created);
        response(res, 201, createResponse(created));
    } catch (error) {
        console.log(error, 'Error in creating admin !');
        response(res, 500, createResponse('Error in creating admin'))
    }
});

router.post('/checkPassword', [
    check('email', 'Invalid credentails, please try again !')
    .isEmail(),
    check('password', 'Invalid credentails, please try again !')
    .isLength({ min: 8, max: 16 }),
    validationError
], async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const exist = await Admin.findOne({ email }).lean();
        if(!exist) {
            return response(res, 400, createResponse('Something went wrong, please try agian !'));
        }
        const match: boolean = await comparePassword(exist.password, password);
        if(!match) {
            return response(res, 400, createResponse('Invalid Credentials, please try again !'));
        }
        const { _id, user_type, contact, email_verified } = exist;
        const data = {
            _id, email, user_type, contact, email_verified
        }
        const token = await createToken(data);
        const finalData = {
            token, user: data
        }
        response(res, 200, createResponse(finalData));
    } catch (error) {
        console.log(error, 'Error in checking password !');
        response(res, 500, createResponse('Error in checking password !'))
    }
});

const data = {
    email: 'string',
    password: 'string',
    name: 'string',
    contact: 'string',
    email_verified: true,
    user_type: AdminType.admin
}



export { router as userRouter };
