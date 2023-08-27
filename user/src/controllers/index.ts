import signinController from "./signinController";
import signupController from "./signupController";
import refreshController from "./refreshController";
import allUsersController from "./allUsersController";
import deleteUserController from "./deleteUserController";
import getAllusersController from "./getAllusersController";



export default (dependancies: any) => {
  return {
    signinController: signinController(dependancies),
    signupController: signupController(dependancies),
    refreshController: refreshController(dependancies),
    allUsersController: allUsersController(dependancies),
    deleteUserController: deleteUserController(dependancies),
    getAllusersController: getAllusersController(dependancies),


  };
};
