// import { mongoose } from "../common/mongo";

import { mongoose } from "../../common/mongo";

enum AdminType {
    admin = 'admin',
    sub_admin = 'sub-admin'
}

interface AdminDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    contact: string;
    email_verified: boolean;
    user_type: AdminType;
}

export {
    AdminDoc, AdminType
}