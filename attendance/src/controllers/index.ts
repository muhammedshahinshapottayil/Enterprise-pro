import geAttendanceUserDetailsController from "./get-attendance-users-details";
import getAttendancebyUserIdController from "./get-attendance-by-user";
import assignController from "./assign-task";
import getAllByDepartmentDetailsController from "./get-attendance-by-department-details";
import getAllByDepartmentController from "./get-all-attendance-by-department";
import getTodaysByUserController from "./get-todays-attendance-by-user";
import getDepartmentByController from "./get-all-department-controller";

export default (dependancies: any) => {
  return {
    assignController: assignController(dependancies),
    geAttendanceUserDetailsController:
      geAttendanceUserDetailsController(dependancies),
    getAllByDepartmentDetailsController:
      getAllByDepartmentDetailsController(dependancies),
    getAttendancebyUserIdController:
      getAttendancebyUserIdController(dependancies),
    getAllByDepartmentController: getAllByDepartmentController(dependancies),
    getTodaysByUserController: getTodaysByUserController(dependancies),
    getDepartmentByController: getDepartmentByController(dependancies),
  };
};
