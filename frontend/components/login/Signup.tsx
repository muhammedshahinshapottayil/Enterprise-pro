import React from "react";
import Input from "../inputs/Input";
import Link from "next/link";
import ButtonPrimary from "../buttons/PrimaryButton";
import CancelButton from "../buttons/CancelButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { validateEmail, validatePassword } from "utils/patterns";

function Signup() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
    confirmPassword: string;
  }> = async (data) => {
    try {
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Sign up to create your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email address
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true, validate: validateEmail }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} />
                      {errors.username && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, validate: validatePassword }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="password" />
                      {errors.password && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{ required: true, validate: validatePassword }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="password" />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center"></div>
                <Link
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="mb-4">
                <ButtonPrimary type="submit">Sign in </ButtonPrimary>
                <CancelButton
                  onClick={() => {
                    reset();
                  }}
                >
                  Cancel
                </CancelButton>
              </div>
            </form>
            <p className="text-sm text-gray-600">
              Don t have an account?
              <Link
                href={`/auth/login`}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in 
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
