import {
  Subjects,
  UserCreatedEvents,
  RequestPublisher,
} from "@enterprisepro/common";
export class getDepByIDPublisher extends RequestPublisher<UserCreatedEvents> {
  subject: Subjects.getDepartment = Subjects.getDepartment;
}
