import mongoose from "mongoose";
import { client, connect } from "./nats-wrapper";
import { app } from './app';
import { listenCreateUser } from "./nats-events/subs/user-created-sub";


const db = async() => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }
    // "mongodb+srv://wings:wings@cluster0.uve59.mongodb.net/users?retryWrites=true&w=majority"
    // console.log(process.env.MONGO_URI, 'mongo uri')
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDb !!");
    return;
  } catch (error) {
    console.log(error, 'Error in connecting to mongoDB !');
    return;
  }
}

const nats = async() => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  await connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );
  return ;
}

const start = async () => {
  try {
    await db();
    await nats();
    client().on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => client().close());
    process.on("SIGTERM", () => client().close());
    
    listenCreateUser(client());

    const PORT = 5000;
    // console.log(app, 'this is the app variable')

    app.listen(PORT, () => {
      console.log(`User service started on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
