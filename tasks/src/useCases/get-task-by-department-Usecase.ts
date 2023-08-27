import { natsWrapper } from "../config/nats-wrapper";
import { getUserByDepPublisher } from "../events/publishers/get-users-by-id";
const getUserByDepartmentUsecase = async (dependancies: any) => {
  const {
    Tasks: { AssignedDepwise, notAssignedDepwise },
  } = dependancies;
  const getUserbyDepartment = async (id: number) => {
    try {
      const assigned = await AssignedDepwise(id);

      const data = { data: assigned, id: id };
      const notAssigned = await new getUserByDepPublisher(
        natsWrapper.client
      ).publish({
        data,
      });
      const response = JSON.parse(notAssigned.data);
      return {
        assigned: assigned?.[0]?.data ?? [],
        not_assigned: response,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return getUserbyDepartment;
};

export default getUserByDepartmentUsecase;
