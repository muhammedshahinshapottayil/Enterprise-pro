import {
    Subjects,
    UserCreatedChatEvents,
    Publisher,
  } from "@enterprisepro/common";
  export class SaveChatPublisher extends Publisher<UserCreatedChatEvents> {
    subject: Subjects.saveToChat = Subjects.saveToChat;
  }
  