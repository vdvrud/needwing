import { Message, Stan } from "node-nats-streaming"
import { Subjects } from "../subjects"
import { listen } from "./base"

const listenCreateUser = (client: Stan, ) => {
    const subject = Subjects.UserCreated;
    const queueGroupName = 'user-service';
    
    listen(client, subject, queueGroupName, onMessage)
}

const onMessage = async (data: any, msg: Message) => {
console.log(data, msg, 'check this data out !')
}

export { listenCreateUser }

// (client: Stan, subject: Subjects, queueGroupName: string, onMessage: (data: any, msg: Message) => any)