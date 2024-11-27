// import { NewMessage } from '#cds-models/ChatService';
// import {
//   AzureOpenAiChatClient,
//   AzureOpenAiChatCompletionToolType
// } from '@sap-ai-sdk/foundation-models';
// import { ApplicationService } from '@sap/cds';
// import { Sender } from './entities.js';
export {};
// export default class ChatService extends ApplicationService {
//   init() {
//     // const Chat = require('#cds-models/ChatService')
//     this.on(NewMessage, async req => {
//       const chatId:any = req.data.chatid;
//       const { Chat, Message } = this.entities;
//       const chat = await SELECT.one.from(Chat).where({
//         ID: chatId
//       });
//       if (!chat) throw req.reject(404, 'chat "${chatId}" does not exist;');
//       const messageList = await SELECT.from(Message)
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
//         role: Sender.User,
//         content: req.data.message?.trim().replace(/\n/g, ' ')
//       });
//       let NewMessages:any = 
//         {
//           UUIDChat: chatId,
//           Sender: Sender.HUMAN,
//           Comment: req.data.message?.trim().replace(/\n/g, ' '),
//           chat: chat
//         }
//       ;
//       let succeeded = await INSERT(NewMessages).into(Message);
//       console.log(succeeded);
//       console.log(messages);
//       const response = await new AzureOpenAiChatClient('gpt-4o').run({
//         messages
//       });
//       if (!chat.ReportName) {
//         messages.push({
//           role: Sender.Assistant
//           // content: response.getContent()
//         });
//         const Tooltype: AzureOpenAiChatCompletionToolType = 'function';
//         const tools = [
//           {
//             type: Tooltype,
//             function: {
//               name: 'get_report_name',
//               description:
//                 '获取报表名称，比如采购订单报表，也可能叫采购订单表',
//               parameters: {
//                 type: 'object',
//                 properties: {
//                   ReportName: {
//                     type: 'string',
//                     description: '报表名称'
//                   }
//                 }
//               }
//             }
//           }
//         ];
//         let get_report_mes: any = [
//           {
//             role: 'user',
//             content: req.data.message?.trim().replace(/\n/g, ' ')
//           }
//         ];
//         const tool_response = await new AzureOpenAiChatClient('gpt-4o').run({
//           messages: get_report_mes,
//           tools //,tool_choice: 'required'
//         });
//         if (tool_response.getFinishReason() == 'tool_calls') {
//           let Reportjson: any =
//             tool_response.data.choices[0].message?.tool_calls?.[0].function
//               .arguments;
//           //  map(
//           //   tool_call => ({
//           //     arguments: tool_call.function.arguments
//           //   })
//           // )[0].arguments;
//           let ReportName = JSON.parse(Reportjson).ReportName;
//           console.log(ReportName);
//        const succeeded = await UPDATE(Chat,chatId).with(
//         {
//           ReportName: ReportName
//         }
//        );
//        console.log(succeeded);
//         }
//       }
//        NewMessages = 
//         {
//           UUIDChat: chatId,
//           Sender: Sender.AI,
//           Comment: response.getContent(),
//           chat: chat
//         }
//       ;
//       console.log(NewMessages);
//       succeeded = await INSERT(NewMessages).into(Message);
//       console.log(succeeded);
//       return response.getContent();
//     });
//     return super.init();
//   }
// }
//# sourceMappingURL=chat-service.js.map