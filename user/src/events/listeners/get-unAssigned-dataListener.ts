import {
  Subjects,
  AssignTaskEvents,
  RequestListener,
} from "@enterprisepro/common";
import { Msg } from "nats";
import DB from "../../frameworks/repositories/User";
export class getUserByIdListener extends RequestListener<AssignTaskEvents> {
  subject: Subjects.getUserDataNotAssigned = Subjects.getUserDataNotAssigned;
  queueGroupName = "get-user-unassigned-by-id";
  async onMessage(
    data: AssignTaskEvents["data"] | any,
    msg: Msg
  ): Promise<any> {
    data = await DB.getDataNotAssigned(data.data!);
    msg.respond(JSON.stringify(data));
  }
}
