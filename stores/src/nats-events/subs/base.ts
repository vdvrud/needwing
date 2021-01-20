import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from '../subjects';

let waitTime = 5 * 1000;

// const subscribe = async(subject: Subjects, queueGroupName: string, client: Stan, ackWait: number = waitTime) => {

// }   

const subOptions = (client: Stan, ackWait: number, queueGroupName: string) => {
        return client
          .subscriptionOptions()
          .setDeliverAllAvailable()
          .setManualAckMode(true)
          .setAckWait(ackWait)
          .setDurableName(queueGroupName);
}

const listen = (client: Stan, subject: Subjects, queueGroupName: string, onMessage: (data: any, msg: Message) => any) => {
    console.log('listen ma ave che ?')
    const subscription = client.subscribe(
      subject,
      queueGroupName,
      subOptions(client, waitTime, queueGroupName)
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${subject} / ${queueGroupName}`);

      const parsedData = parseMessage(msg);
      onMessage(parsedData, msg);
    });
  }

  const parseMessage = (msg: Message) => {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }

//   const onMessage = (data: any, msg: Message) => {
//     return 
//   }

export { listen }

