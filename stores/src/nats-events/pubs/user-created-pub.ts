// import { Stan } from "node-nats-streaming";
// import { AdminDoc, AdminType } from "../../interfaces/models_interfaces";
// import { Subjects } from "../subjects";
// import { publish } from "./base";

// interface subject {
//     subject: Subjects
// }

// interface data {
//     email: string;
//     password: string;
//     name: string;
//     contact: string;
//     email_verified: boolean;
//     user_type: AdminType;
// }


// const publishCreateUser = async (client: Stan, subject: Subjects,data: data) => {
//     return await publish(client, subject, data);
// }

// export {
//     publishCreateUser
// }