import nats, { Stan } from "node-nats-streaming";

let _client: Stan;

const connect = async (clusterId: string, clientId: string, url: string) => {
  _client = nats.connect(clusterId, clientId, { url });

  return new Promise((resolve, reject) => {
    _client.on("connect", () => {
      console.log("Connected to NATS");
      resolve("");
    });
    _client.on("error", (err) => {
      reject(err);
    });
  });
};


const client = () => {
    return _client
}


export {
    connect, client
}