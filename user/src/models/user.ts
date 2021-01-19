import { mongoose, Schema } from "../../common/mongo";

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
    name: string;
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
    name: {
        type: String
    },
    contact: {
        type: String
    }
}, {
    timestamps: true
});

  
  const User = mongoose.model<UserDoc>('user', userSchema);
  
  export { User };