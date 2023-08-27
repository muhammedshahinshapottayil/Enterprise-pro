import mongoose from "mongoose";
import attendanceInterface, {
  attendanceModel,
  attendanceDoc,
} from "../interfaces/AttendanceInterface";
const ObjectId = mongoose.Types.ObjectId;
const attendance = new mongoose.Schema(
  {
    userId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    EmpID: { type: Number, required: true },
    department_name: { type: String, required: true },
    department_id: { type: Number, required: true },
    supervisor_name: { type: String },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: attendanceInterface, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

attendance.statics.build = (attrs: attendanceInterface) => {
  return new Task(attrs);
};
const Task = mongoose.model<attendanceDoc, attendanceModel>(
  "attendance",
  attendance
);
export default Task;
