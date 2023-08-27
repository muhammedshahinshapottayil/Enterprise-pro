import { TaskData } from "../../interfaces/TaskInterface";
import TaskMdl from "../../models/taskMdl";
import { ObjectId } from "mongodb";

const getTaskByTask = async (task_id: number) => {
  try {
    const data = await TaskMdl.find({ task_id });
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createTask = async ({
  EmpID,
  department_id,
  task_id,
  task_name,
  userId,
  department_name,
  supervisor_name,
  data,
}: TaskData) => {
  try {
    const today = new Date();
    today.setUTCHours(18, 0, 0, 0);
    today.setDate(today.getDate() - 1);

    const Create = await TaskMdl.updateOne(
      {
        department_id,
        createdAt: { $gte: new Date(today) },
      },
      {
        $set: {
          EmpID,
          department_id,
          task_id,
          task_name,
          userId,
          department_name,
          supervisor_name,
        },
        $addToSet: { data: { $each: data } },
      },
      { upsert: true }
    );

    return Create ? Create : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateTask = async ({ department_id, assignedData }: TaskData) => {
  const data = assignedData?.map((item: any) => new ObjectId(item.id));
  try {
    const today = new Date();
    today.setUTCHours(18, 0, 0, 0);
    today.setDate(today.getDate() - 1);
    const Create = await TaskMdl.updateOne(
      {
        department_id,
        createdAt: { $gte: new Date(today) },
      },
      {
        $pull: { data: { _id: { $in: data } } },
      }
    );
    return Create ? Create : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTaskByDepartment = async (department_id: number) => {
  try {
    const user = await TaskMdl.find({ department_id });
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTaskByUser = async ({ id, dep }: { id: ObjectId; dep: number }) => {
  try {
    const today = new Date();
    today.setUTCHours(18, 0, 0, 0);
    today.setDate(today.getDate() - 1);

    const userExists = await TaskMdl.find(
      {
        department_id: dep,
        createdAt: { $gte: new Date(today) },
        "data._id": id,
      },
      { "data.$": 1, _id: 1, task_name: 1, department_name: 1 }
    );
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllTasks = async () => {
  try {
    const data = await TaskMdl.find({});
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const AssignedDepwise = async (department_id: number) => {
  const today = new Date();
  today.setUTCHours(18, 0, 0, 0);
  today.setDate(today.getDate() - 1);

  const user = await TaskMdl.find(
    {
      department_id: Number(department_id),
      createdAt: { $gte: new Date(today) },
    },
    { data: 1, _id: 0 }
  );
  return user ? user : false;
};

const notAssignedDepwise = async (department_id: number) => {
  const today = new Date();
  today.setUTCHours(18, 0, 0, 0);
  today.setDate(today.getDate() - 1);
  const user = await TaskMdl.find(
    {
      createdAt: { $gte: new Date(today) },
      department_id: Number(department_id),
    },
    { data: 1, _id: 0 }
  );
  return user ? user : false;
};

const addUpdates = async ({
  id,
  title,
  user,
}: {
  id: ObjectId;
  title: string;
  user: ObjectId;
}) => {
  try {
    const Create = await TaskMdl.updateOne(
      {
        _id: new ObjectId(id),
        "data._id": new ObjectId(user),
      },
      {
        $push: { "data.$.updates": { title } },
      }
    );

    return Create ? Create : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  addUpdates,
  getTaskByTask,
  getTaskByDepartment,
  getTaskByUser,
  getAllTasks,
  createTask,
  notAssignedDepwise,
  AssignedDepwise,
  updateTask,
};
