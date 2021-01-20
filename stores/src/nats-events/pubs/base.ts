import { Stan } from 'node-nats-streaming';
import { Subjects } from '../subjects';



const publish = async(client: Stan, subject: Subjects, data: any) => {
    return new Promise((resolve, reject) => {
        client.publish(subject, JSON.stringify(data), (err) => {
          if (err) {
            return reject(err);
          }
          console.log('Event published to subject', subject);
          resolve('');
        });
      });
}

export { publish }