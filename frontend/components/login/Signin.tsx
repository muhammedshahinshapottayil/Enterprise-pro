import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Input from "../inputs/Input";
import ButtonPrimary from "../buttons/PrimaryButton";
import CancelButton from "../buttons/CancelButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { validateEmail, validatePassword } from "utils/patterns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function SigninComp() {
  const session: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.data?.user?.[0]?.role == "user") {
      router.push("/user");
    } else if (session?.data?.user?.[0]?.role == "admin") {
      router.push("/admin");
    } else if (session?.data?.user?.[0]?.role == "supervisor") {
      router.push("/supervisor");
    }
  }, [session]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
  }> = async (data: { username: string; password: string }) => {
    try {
      await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        // callbackUrl: "/user",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Sign in to your account
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
              // rules={{ required: true, validate: validatePassword }}
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
        {/* <p className="text-sm text-gray-600">
          Don t have an account ?
          <Link
            href="/auth/signup"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  );
}

export default SigninComp;
