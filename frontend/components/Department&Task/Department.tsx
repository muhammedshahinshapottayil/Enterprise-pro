import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ButtonPrimary from "components/buttons/PrimaryButton";
import CancelButton from "components/buttons/CancelButton";
import Input from "components/inputs/Input";
import Instance from "config/axiosConfig/deptaskinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Department({
  getDepartment,
  changedDep,
  setchangedDep,
  setselected,
}: {
  getDepartment: Function;
  changedDep: { id: number; name: string };
  setchangedDep: Function;
  setselected: Function;
}) {
  const notify = (message: string) => toast(message);
  const errorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const onSubmit: SubmitHandler<{
    id: number;
    name: string;
  }> = async (data: { name: string }) => {
    try {
      await Instance.post("/department", data);
      control._defaultValues.name = "";
      control._defaultValues.id = 0;
      reset();
      setchangedDep(null);
      getDepartment();
      notify("Successfully Completed");
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: changedDep?.id ? changedDep?.id : 0,
      name: changedDep?.name,
    },
  });

  return (
    <div>
      <ToastContainer/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <div>
                  <Input {...field} />
                  {errors.name && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <Controller
            name="id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <div>
                  <Input style={{ display: "none" }} {...field} />
                </div>
              );
            }}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center"></div>
        </div>
        <div className="mb-4">
          <ButtonPrimary type="submit">Submit </ButtonPrimary>
          <CancelButton
            onClick={() => {
              setselected("tasks");
              setchangedDep(null);
              reset();
              setTimeout(() => {
                setselected("department");
              }, 1);
            }}
          >
            Cancel
          </CancelButton>
        </div>
      </form>
    </div>
  );
}

export default Department;
