import React, { useState } from "react";
import Select from "components/inputs/Select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ButtonPrimary from "components/buttons/PrimaryButton";
import CancelButton from "components/buttons/CancelButton";
import Input from "components/inputs/Input";
import Instance from "config/axiosConfig/deptaskinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Task({
  getTasks,
  department,
  changeTask,
  setselected,
  setchangeTask,
}: {
  getTasks: Function;
  department: { id: number; name: string }[];
  changeTask: {
    id: number;
    name: string;
    fk_department: number;
    status: number;
    created_at: string;
  };
  setselected: Function;
  setchangeTask: Function;
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
    name: string;
    id: number;
    fk_department: number;
  }> = async (data: { name: string; id: number; fk_department: number }) => {
    try {
      await Instance.post("/task", data);
      control._defaultValues.name = "";
      control._defaultValues.id = 0;
      control._defaultValues.fk_department = 0;
      reset();
      setchangeTask(null);
      getTasks();
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
      id: changeTask?.id ? changeTask.id : 0,
      name: changeTask?.name,
      fk_department: changeTask?.fk_department,
    },
  });

  return (
    <div>
      <ToastContainer />
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
            render={({ field }) => (
              <div>
                <Input {...field} />
                {errors.name && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fk_department"
            className="block text-sm font-medium text-gray-600"
          >
            Department
          </label>
          <Controller
            name="fk_department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <Select {...field}>
                  <option value="">Select a Department</option>;
                  {department &&
                    department.map((item: { name: string; id: number }) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </Select>
                {errors.fk_department && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.fk_department.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
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
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center"></div>
        </div>
        <div className="mb-4">
          <ButtonPrimary type="submit">Submit </ButtonPrimary>
          <CancelButton
            onClick={() => {
              setselected("department");
              setchangeTask(null);
              reset();
              setTimeout(() => {
                setselected("tasks");
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

export default Task;
