import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Below are the attributes for building a new document via build method.
interface UserAttrs {
    email: string;
    password: string;
    contact_number: string;
}

// These are the fields which will be stored in a user document.
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    contact_number: string;
    primary_contact: object;
}

// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attrs: UserAttrs): UserDoc;
//   }

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    primary_contact: {
        contact: {
            type: String
        },
        country_code: {
            type: String
        }
    },
    contact_verified: {
        type: Boolean,
        default: false
    },
    email_verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

  
  const User = mongoose.model<UserDoc>('user', userSchema);
  
  export { User };