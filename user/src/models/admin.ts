// import { mongoose, Schema } from "../../common/mongo";
import { AdminDoc } from "../interfaces/models_interfaces";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    user_type: {
        type: String,
        enum: ['admin', 'sub-admin'],
        default: 'admin'
    }
}, {
    versionKey: true
});

const Admin = mongoose.model<AdminDoc>('admin', adminSchema);

export { Admin }