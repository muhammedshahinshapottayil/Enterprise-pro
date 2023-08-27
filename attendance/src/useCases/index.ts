import getDepartmentUsecase from "./get-all-department-Usecase";
import getAttendanceByUserDetailsUsecase from "./get-attendance-by-user-details-Usecase";
import getAttendanceByDepartmentUsecase from "./get-attendance-by-department-Usecase";
import getAttendanceByUserUsecase from "./get-attendance-by-user-Usecase";
import assignTaskUsecase from "./assignTaskUsecase";
import getAttendanceByDepartmentDetailsUsecase from "./get-attendance-by-department-details";
import getTodayAttendanceUsecase from "./get-todays-attendance-Usecase";

export default {
  assignTaskUsecase,
  getTodayAttendanceUsecase,
  getAttendanceByDepartmentUsecase,
  getAttendanceByDepartmentDetailsUsecase,
  getAttendanceByUserUsecase,
  getAttendanceByUserDetailsUsecase,
  getDepartmentUsecase,
};
