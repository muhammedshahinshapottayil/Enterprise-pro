import {
  Subjects,
  UserCreatedEvents,
  RequestListener,
} from "@enterprisepro/common";
import { Msg } from "nats";
import DB from "../../frameworks/repositories/Department";
export class getDepartmentByIdListener extends RequestListener<UserCreatedEvents> {
  subject: Subjects.getDepartment = Subjects.getDepartment;
  queueGroupName = "get-dep-by-id";
  async onMessage(
    data: UserCreatedEvents["data"] | any,
    msg: Msg
  ): Promise<any> {
    data = await DB.getByid(data.data!);
    msg.respond(JSON.stringify(data));
  }
}
