import argon2 from "argon2";
import crypto from "crypto";
import { initialSignupData } from "../interfaces/userinterface";
import { getDepByIDPublisher } from "../events/publishers/get-dep-by-id";
import { natsWrapper } from "../config/nats-wrapper";
import { SaveChatPublisher } from "../events/publishers/save-chat-db";

const signUpUsecase = async (dependencies: any) => {
  const {
    User: {
      getUserbyusername,
      createUser,
      getMaxEmpId,
      checkExistingSupervisor,
    },
  } = dependencies;

  const signup = async ({
    name,
    username,
    password,
    role,
    profile_image,
    scan_image,
    department,
    address,
    mobile,
    mobile_2,
    type,
    unique_id,
  }: initialSignupData) => {
    try {
      const userExists = await getUserbyusername(username);
      if (userExists) throw new Error("User Already Exists");

      const supervisorExist = await checkExistingSupervisor(department);
      if (supervisorExist && role == "supervisor")
        throw new Error("Supervisor Already Exists");

      const personal_details = {
        address,
        mobile,
        mobile_2,
        unique_identification_number: {
          type,
          unique_id,
        },
      };
      const data = department;
      const emp_id = await getMaxEmpId();

      const datas = await new getDepByIDPublisher(natsWrapper.client).publish({
        data,
      });
      const response = JSON.parse(datas.data);
      const department_name = response?.[0]?.name;

      crypto.randomBytes(32, async (err, buf: any) => {
        password = await argon2.hash(password, buf);
        const userCreate: any = await createUser({
          emp_id: ++emp_id[0].maxKey,
          name,
          username,
          password,
          role,
          profile_image,
          scan_image,
          department,
          department_name,
          personal_details,
        });
        let data = userCreate;
        await new SaveChatPublisher(natsWrapper.client).publish({ data });
        if (userCreate) return true;
        else return false;
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signup;
};

export default signUpUsecase;
