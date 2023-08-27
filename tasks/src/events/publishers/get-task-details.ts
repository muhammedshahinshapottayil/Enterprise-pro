import {
  Subjects,
  GetTaskDetailsEvent,
  RequestPublisher,
} from "@enterprisepro/common";
export class getTaskDetailsPublisher extends RequestPublisher<GetTaskDetailsEvent> {
  subject: Subjects.getTaskDetails = Subjects.getTaskDetails;
}
