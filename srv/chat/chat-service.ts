import {
    AzureOpenAiChatClient,
    AzureOpenAiChatCompletionToolType
} from '@sap-ai-sdk/foundation-models';
import { ApplicationService } from '@sap/cds';
import { Sender } from './entities.js';
export default class ChatService extends ApplicationService {
  init() {
    const { Chat } = require('#cds-models/ChatService');

    const { newRecord } = Chat.actions;

    this.on(newRecord, async req => {
      //   const chatId:any = req.data.chatid
      const { Records } = this.entities;

      const Chat = await SELECT.one.from(req.subject);
      const [ Chats ] = req.params;

      //   if (!Chat) throw req.reject(404, 'chat "${chatId}" does not exist;');
      const records = await SELECT.from(Records)
        .where({
          chat_ID: Chats
        })
        .orderBy('createdAt');

      let messages: any = [
        {
          role: Sender.User,
          content: req.data.content?.trim().replace(/\n/g, ' ')
        }
      ];

      if (records) {
        let messages = records.map(
          (record: { role: string; content: string }) => ({
            role:
              record.role === Sender.Assistant ? Sender.Assistant : Sender.User,
            content: record.content.trim().replace(/\n/g, ' ')
          })
        );
        messages.push({
          role: Sender.User,
          content: req.data.content?.trim().replace(/\n/g, ' ')
        });
      }

      let Newrecord: any = {
        chat: Chat,
        role: Sender.User,
        content: req.data.content?.trim().replace(/\n/g, ' ')
      };
      let succeeded = await INSERT(Newrecord).into(Records);
      console.log(succeeded);

      console.log(messages);
      const response = await new AzureOpenAiChatClient('gpt-4o').run({
        messages
      });

      if (!Chat.title) {
        messages.push({
          role: Sender.Assistant,
          content: response.getContent()
        });

        const Tooltype: AzureOpenAiChatCompletionToolType = 'function';

        const tools = [
          {
            type: Tooltype,
            function: {
              name: 'get_report_name',
              description: '获取报表名称，比如采购订单报表，也可能叫采购订单表',
              parameters: {
                type: 'object',
                properties: {
                  ReportName: {
                    type: 'string',
                    description: '报表名称'
                  }
                }
              }
            }
          }
        ];
        let get_report_mes: any = [
          {
            role: 'user',
            content: req.data.content?.trim().replace(/\n/g, ' ')
          }
        ];

        const tool_response = await new AzureOpenAiChatClient('gpt-4o').run({
          messages: get_report_mes,
          tools //,tool_choice: 'required'
        });

        if (tool_response.getFinishReason() == 'tool_calls') {
          let Reportjson: any =
            tool_response.data.choices[0].message?.tool_calls?.[0].function
              .arguments;

          let Title = JSON.parse(Reportjson).ReportName;
          console.log(Title);

          const succeeded = await UPDATE(req.subject).with({
            title: Title
          });

          console.log(succeeded);
        }
      }

      Newrecord = {
        chat: Chat,
        role: Sender.User,
        content: req.data.content?.trim().replace(/\n/g, ' ')
      };
      console.log(Newrecord);

      succeeded = await INSERT(Newrecord).into(Records);
      console.log(succeeded);

      return response.getContent();
    });
    return super.init();
  }
}
