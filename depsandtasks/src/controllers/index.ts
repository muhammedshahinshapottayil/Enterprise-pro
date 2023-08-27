import saveDepController from "./savedepartmentController";
import saveTaskController from "./saveTaskController";
import getAlldepartment from "./getAlldepartment";
import getDepartmentByIdController from "./getDepartmentByIdController";
import deleteDepartment from "./deleteDepartment";
import deleteTaskController from "./deleteTaskController";
import getAllTask from "./getAllTask";
import getTaskbyIdController from "./getTaskbyIdController";
import getTaskbyDepartment from "./getTaskbyDepartment";



export default (dependancies: any) => {
  return {
    saveDepController: saveDepController(dependancies),
    saveTaskController: saveTaskController(dependancies),
    getAlldepartment: getAlldepartment(dependancies),
    getDepartmentByIdController: getDepartmentByIdController(dependancies),
    deleteDepartmentController: deleteDepartment(dependancies),
    deleteTaskController: deleteTaskController(dependancies),
    getAllTask: getAllTask(dependancies),
    getTaskbyIdController: getTaskbyIdController(dependancies),
    getTaskbyDepartment: getTaskbyDepartment(dependancies),

  };
};
