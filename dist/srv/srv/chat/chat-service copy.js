// import { NewMessage, chat } from '#cds-models/ChatService';
// import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';
// import { ApplicationService } from '@sap/cds';
// import { Sender } from './entities.js';
export {};
// export default class ChatService extends ApplicationService  {
//   init() {
//     this.on( NewMessage ,async req => {
//       const chatId = req.data.chatid;
//       const messageList = await SELECT.from('message')
//         .where({
//           UUIDChat: chatId
//         })
//         .orderBy('createdAt');
//       let messages = messageList.map(
//         (message: { Sender: string; Comment: string }) => ({
//           role: message.Sender === Sender.AI ? Sender.Assistant : Sender.User,
//           content: message.Comment.trim().replace(/\n/g, ' ')
//         })
//       );
//       messages.push({
//         role: 'user',
//         content: req.data.message?.trim().replace(/\n/g, ' ')
//       });
//       console.log(messages);
//       const response = await new AzureOpenAiChatClient('gpt-4o').run({
//         messages
//       });
//       const chat = await SELECT.one.from('chats')
//       .where({
//         ID: chatId
//       });
//       let NewMessages= [
//         {
//           UUIDChat: chatId,
//           Sender: Sender.AI,
//           Comment: response.getContent(),
//           chat: chat,
//         },
//         {
//           UUIDChat: chatId,
//           Sender: Sender.HUMAN,
//           Comment:  req.data.message?.trim().replace(/\n/g, ' '),
//           Reply : response.getContent(),
//           chat: chat
//         },
//       ];
//       console.log(NewMessages);
//       const { message } = this.entities
//       const succeeded = await INSERT(NewMessages).into(message);
//       console.log(succeeded); 
//       return response.getContent();
//     })
//     return super.init()
//   }
// }
//# sourceMappingURL=chat-service%20copy.js.map