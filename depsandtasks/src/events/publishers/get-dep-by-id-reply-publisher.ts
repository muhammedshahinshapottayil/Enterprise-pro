import {
  Subjects,
  UserCreatedEventsReply,
  Publisher,
} from "@enterprisepro/common";
export class getDepartmentReplyPublisher extends Publisher<UserCreatedEventsReply> {
  subject: Subjects.getDepartmentReply = Subjects.getDepartmentReply;
}
