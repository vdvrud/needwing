import express, { Request, Response } from 'express';
const router = express.Router();
import { User } from '../../models/user';
import { check } from 'express-validator';
import { validationErrorCheck } from '../../../common/validation';
import { createResponse, response } from '../../../common/response';
import { comparePassword, hashPassword } from '../../../common/password-methods';
import { createToken } from '../../../common/jwt';



router.post('/registerUser', [
    check('email', 'Email is not valid !')
    .isEmail(),
    check('password', 'Password not valid !')
    .not()
    .isEmpty(),
    validationErrorCheck
],async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const exist = await User.aggregate([
            {
                $match: {
                    email
                }
            }
        ]);
        if(exist.length !== 0) {
            return response(res, 400, createResponse('Email already exist !'))
        }
        const newUser = {
            email, password: await hashPassword(password)
        }
        const created = await new User(newUser).save();
        console.log(created, 'this is the created user');
        response(res, 201, createResponse(created));
    } catch (error) {
        console.log(error, 'Error in registering user !');
        response(res, 500, createResponse('Error in registering user !'))
    }
});

router.post('/updateContact', [
    check('contact', 'Contact not valid !')
    .isLength({ min: 10, max: 10 }),
    check('country_code')
    .not()
    .isEmpty(),
    check('email', 'Email not valid !')
    .isEmail(),
    validationErrorCheck
], async(req: Request, res: Response) => {
    try {
        const { email, contact, country_code } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return response(res, 400, createResponse('User does not exist !'))
        }
        user.primary_contact = {
            contact, country_code
        };
        await user.save();
        response(res, 200, createResponse(user));
    } catch (error) {
        console.log(error, 'Error in updating primary contact !')
        response(res, 500, createResponse('Erorr in updating contact !'))
    }
});


router.post('/userLogin', [
    check('password', 'Invalid Credentials !')
    .not()
    .isEmpty(),
    check('entry', 'Please provide valid email or contact number !')
    .not()
    .isEmpty(),
    validationErrorCheck
],async(req: Request, res: Response) => {
    try {
        let validEmail = false;
        let query = {}
        const { password, entry } = req.body;
        const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailRegex.test(entry) ? validEmail = true : validEmail = false;
        if(!validEmail) {
            let validPhone = false;
            phoneRegex.test(entry) ? validPhone = true : validPhone = false;
            if(!validPhone) {
                return response(res, 400, createResponse('Please provide valid email or phone !'))
            }
            query = {
                'primary_contact.contact': entry
            }
        } else {
            query = {
                email: entry
            }
        }
        const exist = await User.aggregate([
            {
                $match: query
            }
        ]);

        if(exist.length === 0) {
            return response(res, 400, createResponse('Invalid Credentials !'))
        }

        const user = exist[0];
        console.log(user, 'this is user')
        const match = await comparePassword(password, user.password);
        if(!match) {
            return response(res, 400, createResponse('Invalid Credentials !'))
        }
        const finalData = {
            auth_token: await createToken({user}), ...user
        }
        response(res, 200, createResponse(finalData));
    } catch (error) {
        console.log(error, 'Error in login');
        response(res, 500, createResponse('Error in login'))
    }
})

export { router as userRouter };
