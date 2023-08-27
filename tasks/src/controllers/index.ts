import assignController from "./assign-task";
import getAlluserController from "./get-all-users-task";
import getTaskbyDepController from "./get-task-by-department";
import getTaskbyTaskController from "./get-task-by-task";
import getTaskbyUserIdController from "./get-task-by-user";
import updateController from "./update-task";
import getAlltaskByController from "./get-all-task-by-department";

export default (dependancies: any) => {
  return {
    assignController: assignController(dependancies),
    getAlluserController: getAlluserController(dependancies),
    getTaskbyDepController: getTaskbyDepController(dependancies),
    getTaskbyTaskController: getTaskbyTaskController(dependancies),
    getTaskbyUserIdController: getTaskbyUserIdController(dependancies),
    updateController: updateController(dependancies),
    getAlltaskByController: getAlltaskByController(dependancies),
  };
};
