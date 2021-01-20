import { mongoose, Schema } from "../../common/mongo";


// These are the fields which will be stored in a user document.
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    contact: string;
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