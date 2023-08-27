import mongoose from "mongoose";
import TaskInterface, { taskModel, taskDoc } from "../interfaces/TaskInterface";
const ObjectId = mongoose.Types.ObjectId;
const tasks = new mongoose.Schema(
  {
    userId: { type: ObjectId, required: true },
    EmpID: { type: Number, required: true },
    // task_id: { type: Number, required: true },
    // task_name: { type: String, required: true },
    department_id: { type: Number, required: true },
    department_name: { type: String, required: true },
    supervisor_name: { type: String, required: true },
    data: [
      {
        _id: { type: ObjectId },
        name: { type: String },
        emp_id: { type: Number },
        checked: { type: Boolean },
        task_id: { type: Number },
        task_name: { type: String },
        updates: [
          {
            title: { type: String, required: true },
            timestamp: { type: Date, default: new Date() },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: TaskInterface, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

tasks.statics.build = (attrs: TaskInterface) => {
  return new Task(attrs);
};
const Task = mongoose.model<taskDoc, taskModel>("tasks", tasks);
export default Task;
