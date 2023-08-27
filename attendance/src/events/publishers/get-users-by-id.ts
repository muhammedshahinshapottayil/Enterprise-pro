import {
  Subjects,
  AssignTaskEvents,
  RequestPublisher,
} from "@enterprisepro/common";
export class getUserByDepPublisher extends RequestPublisher<AssignTaskEvents> {
  subject: Subjects.getUserDataNotAssigned = Subjects.getUserDataNotAssigned;
}
