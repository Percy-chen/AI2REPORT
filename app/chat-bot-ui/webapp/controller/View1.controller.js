sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",'sap/m/library'
],
function (Controller, JSONModel, library) {
    "use strict";
    var URLHelper = library.URLHelper;
    return Controller.extend("chatbotui.controller.View1", {
        _sCsrfToken: null,

        onInit: function () {
            const oUiModel = new JSONModel({
                busy: false,
                summary: {
                    txtInput: "",
                    txtSummary: "",
                },
                chatbot: {
                    txtInput: "",
                    messages: [{
                            role: "system",
                            content: "You are a helpful AI Assistant who can help user queries about SAP technologies. Graciously to answer questions that are not related to SAP."
                        }
                        // {
                        //   role: "assistant",
                        //   content: "Hello, I am your Chatbot. How can I help you?",
                        // }
                    ],
                },
            });

            this.getView().setModel(oUiModel, "ui");
            this._apiGetchat();
            this.onNewChat();
        },

        onBtnSummaryPress: async function () {
            const oUiModel = this.getView().getModel("ui");
            const sTxtInput = oUiModel.getProperty("/summary/txtInput");
            oUiModel.setProperty("/busy", true);
            const txtSummary = await this._apiChatCompletion([{
                role: "system",
                content: "Write a TL;DR/summary of the user content in a paragraph.",
            }, {
                role: "user",
                content: sTxtInput,
            }, ]);
            oUiModel.setProperty("/busy", false);
            oUiModel.setProperty("/summary/txtSummary", txtSummary);
        },

        onBtnChatbotSendPress: async function () {
            const oUiModel = this.getView().getModel("ui");
            const txtInput = oUiModel.getProperty("/chatbot/txtInput");
            const oMessages = [
                ...oUiModel.getProperty("/chatbot/messages"), {
                    role: "user",
                    content: txtInput
                },
            ];
            oUiModel.setProperty("/chatbot/messages", oMessages);
            oUiModel.setProperty("/chatbot/txtInput", "");
            oUiModel.setProperty("/busy", true);
            //const txtSummary = await this._apiChatCompletion(oMessages);
            const txtSummary = await this._apiChatLocal(txtInput);
            oUiModel.setProperty("/busy", false);
            oMessages.push({
                role: "assistant",
                content: txtSummary.content,
                message_id :txtSummary.ID,
                visible0 : true,
                visible1 : false
            });
            oUiModel.setProperty("/chatbot/messages", oMessages);
        },

        // _apiChatLocal: async function (oMessages) {
        //     const res = await fetch(
        //         `/odata/v4/azure-openai/chatCompletion`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 // "X-CSRF-Token": await this._apiFetchCsrfToken(),
        //                 "Content-Type": "application/json",
        //                 // "AI-Resource-Group": "default",
        //             },
        //             // credentials: "same-origin",
        //             body: JSON.stringify({
        //                 messages: oMessages,
        //             }),
        //         }
        //     );
        //     const resData = await res.text();
        //     return JSON.parse(resData).value;
        // },
        _apiChatLocal: async function (oMessages) {
            const oUiModel = this.getView().getModel("ui");
            const chatID = oUiModel.getProperty("/chatID");
            const url = '/ai2report/Chats' + '(' + chatID + ')' + '/newRecord'
            const res = await fetch(
                url, {
                    method: "POST",
                    headers: {
                        // "X-CSRF-Token": await this._apiFetchCsrfToken(),
                        "Content-Type": "application/json",
                        // "AI-Resource-Group": "default",
                    },
                    // credentials: "same-origin",
                    body: JSON.stringify({
                        content: oMessages,
                    }),
                }
            );
            const resData = await res.text();
            return JSON.parse(resData);
        },

        /**
         * Gets the URL prefix of the app
         * @returns {string} the URL module prefix
         */
        _getUrlModulePrefix() {
            return $.sap.getModulePath(
                this.getOwnerComponent().getManifestEntry("/sap.app/id")
            );
        },

        /**
         * API - fetches CSRF token
         *
         * **Note**: For testing/development, you can turn off CSRF protection in the `xs-app.json`
         * by setting `csrfProtection: false` for `"source": "^/api/(.*)$"` route.
         */
        _apiFetchCsrfToken: async function () {
            if (!this._sCsrfToken) {
                const res = await fetch(`${this._getUrlModulePrefix()}/index.html`, {
                    method: "HEAD",
                    headers: {
                        "X-CSRF-Token": "fetch",
                    },
                    credentials: "same-origin",
                });
                this._sCsrfToken = res.headers.get("x-csrf-token");
            }
            return this._sCsrfToken;
        },

        /**
         * API - generates a summary by making an API call to GenAI Hub
         * @param {Object[]} oMessages an array of messages
         * @returns {Promise<string>} chat completion
         */
        _apiChatCompletion: async function (oMessages) {
            const res = await fetch(
                `${this._getUrlModulePrefix()}/api/chat/completions?api-version=${API_VERSION}`, {
                    method: "POST",
                    headers: {
                        "X-CSRF-Token": await this._apiFetchCsrfToken(),
                        "Content-Type": "application/json",
                        "AI-Resource-Group": "default",
                    },
                    credentials: "same-origin",
                    body: JSON.stringify({
                        messages: oMessages,
                    }),
                }
            );
            const resData = await res.json();
            // extract the message content of first choice
            return resData.choices[0].message.content;
        },
        onNewChat: async function () {
            const oUiModel = this.getView().getModel("ui");
            oUiModel.setProperty("/chatbot/messages", []);
            const Arry = await this._apiNewchat();
            oUiModel.setProperty("/chatID", Arry.ID);

        },
        _apiNewchat: async function () {
            const res = await fetch(
                `/ai2report/Chats`, {
                    method: "POST",
                    headers: {
                        // "X-CSRF-Token": await this._apiFetchCsrfToken(),
                        "Content-Type": "application/json",
                        // "AI-Resource-Group": "default",
                    },
                }
            );
            const resData = await res.text();
            return JSON.parse(resData);
        },
        _apiGetchat: async function () {
            const oUiModel = this.getView().getModel("ui");
            const url = '/ai2report/Chats' + "?$orderby=createdAt";
            const res = await fetch(
                url, {
                    method: "GET",
                    headers: {
                        // "X-CSRF-Token": await this._apiFetchCsrfToken(),
                        "Content-Type": "application/json",
                        // "AI-Resource-Group": "default",
                    },
                }
            );
            const resData = await res.text();
            oUiModel.setProperty("/chatbot/chatlist", JSON.parse(resData).value);
        },
        onStandardListItemPress: async function (oEvent) {
            const sPath = oEvent.getSource().oBindingContexts.ui.getPath();
            const line = sPath.split("/")[3];
            const oUiModel = this.getView().getModel("ui");
            var List = oUiModel.getProperty("/chatbot/chatlist");
            await this._apigetChatwins(List[line].ID);
            oUiModel.setProperty("/chatID", List[line].ID);

        },
        _apigetChatwins: async function (chat_id) {
            const oUiModel = this.getView().getModel("ui");
            const filter = "?$filter=" + "chat_ID eq '" + chat_id + "'" + "&$orderby=createdAt";
            const url = '/ai2report/Records' + filter;
            const res = await fetch(
                url, {
                    method: "GET",
                    headers: {
                        // "X-CSRF-Token": await this._apiFetchCsrfToken(),
                        "Content-Type": "application/json",
                        // "AI-Resource-Group": "default",
                    },
                }
            );
            const resData = await res.text();
            const Arry = JSON.parse(resData).value;
            const oMes = [];
            if (Arry.length === 0) {
            } else {
                for (let i = 0; i < Arry.length; i++) {
                    const Mes = {
                        "role": Arry[i].role,
                        "content": Arry[i].content,
                        "message_id":Arry[i].ID
                    };
                    if (Arry[i].isAdopted === "X") {
                        Mes.visible0 = false;
                        Mes.visible1 = true;
                    }else{
                        Mes.visible0 = true;
                        Mes.visible1 = false;
                    }
                    oMes.push(Mes);
                };
            }
            oUiModel.setProperty("/chatbot/messages", oMes);
        },
        onBtnAdoptPress:async function(oEvent){
            const oUiModel = this.getView().getModel("ui");
            oUiModel.setProperty("/busy1", true);
            const oMessages = oUiModel.getProperty("/chatbot/messages");
            const sPath = oEvent.getSource().mBindingInfos.visible.binding.oContext.getPath();
            const line = sPath.split("/")[3];
            //const txtSummary = await this._apiChatCompletion(oMessages);
            const txtSummary = await this._apiChatAdopt(oMessages,line);
            oUiModel.setProperty("/busy1", false);

            oMessages.push({
                role: "assistant",
                content: txtSummary.content
            });
            oUiModel.setProperty("/chatbot/messages", oMessages);

        },
        _apiChatAdopt:async function(oMessages,line){
            const oUiModel = this.getView().getModel("ui");
            const url = '/ai2report/Records' + '(' + oMessages[line].message_id + ')' + '/adopt'
            const res = await fetch(
                url, {
                    method: "POST",
                    // headers: {
                    //     // "X-CSRF-Token": await this._apiFetchCsrfToken(),
                    //     "Content-Type": "application/json",
                    //     // "AI-Resource-Group": "default",
                    // },
                }
            );
            // const resData = await res.text();
            // const Arry = JSON.parse(resData);
            // if (resData.length == 0) {
                oMessages[line].visible0 = false;
                oMessages[line].visible1 = true;
            // }
            oUiModel.setProperty("/chatbot/messages", oMessages);
        },
        onBtnDisplayPress:function(){
            window.location.href = "http://localhost:4004/reports/webapp/index.html#/Reports(ID=c271a489-1ce0-4951-8938-94834522b4a4,IsActiveEntity=true)";
        }
    });
});