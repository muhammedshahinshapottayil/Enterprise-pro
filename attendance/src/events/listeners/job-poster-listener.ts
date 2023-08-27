import { Subjects, Listener, JobPosterEvents } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";
import User from "../../models/attendanceMdl";
import { JobPosterPublisher } from "../publishers/job-poster-publisher";
import { natsWrapper } from "../../config/nats-wrapper";
import { userByid } from "../../frameworks/repositories/Attendance";
export class JobPosterListener extends Listener<JobPosterEvents> {
  subject: Subjects.jobPosterData = Subjects.jobPosterData;
  queueGroupName = "job-poster-queue";
  async onMessage(
    data: JobPosterEvents["data"] | any,
    msg: Message,
    replyTo: any
  ): Promise<any> {
    (data = await userByid(data.data[0].fk_id)),
      await new JobPosterPublisher(natsWrapper.client).publish({ data });
    msg.ack();
  }
}
