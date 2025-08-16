"use client";
import { authApi } from "@/api/authApi";
import { FormInput } from "@/components/FormInput";
import GoogleLogo from "@public/GoogleLogo.svg";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "./Button";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      console.log("onSubmit started");
      try {
        const response = await authApi.login(values);

        console.log("Успешная авторизация:", response);

        // Перенаправляем на дашборд
        router.push("/dashboard/1");
      } catch (error: any) {
        console.error("Ошибка авторизации:", error);

        // Обрабатываем разные типы ошибок
        if (error.response?.status === 401) {
          setError("Неверное имя пользователя или пароль");
        } else if (error.response?.status === 400) {
          setError("Некорректные данные");
        } else {
          setError("Произошла ошибка. Попробуйте позже");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-1/3 relative rounded-xl p-px bg-gradient-to-br from-[#111213] to-[#191A1C] shadow-[0_0_40px_rgba(0,0,0,0.3)]">
      <form onSubmit={formik.handleSubmit} className="bg-[#1B1B1D] p-4">
        <h1 className="font-bold text-4xl text-cream200 pt-8">Sign In</h1>
        <h2 className="font-semibold text-3xl text-sage600 pt-3">
          Welcome back!
        </h2>
        <button className="w-full mt-10 p-2 rounded-md border border-warm-grey200 bg-cream200 flex justify-center items-center">
          <Image src={GoogleLogo} alt="Google logo" />
          <p className={"font-bold text-xl text-warm-grey600 pl-4"}>
            Sign in with Google
          </p>
        </button>
        <div className="py-3 flex items-center text-base text-warm-grey400 before:flex-1 before:border-t before:border-warm-grey400 before:me-6 after:flex-1 after:border-t after:border-warm-grey400 after:ms-6 ">
          or
        </div>
        <FormInput formik={formik} name={"username"} labelText="Username" />
        <FormInput
          formik={formik}
          name={"password"}
          labelText="Password"
          inputType="password"
        />
        <div className="flex flex-col items-center">
          <Button
            type="submit"
            variant="gradient-orange"
            className="w-[300px] h-14 mt-10 py-2 text-2xl"
            disabled={!formik.isValid}
          >
            Sign In
          </Button>
          <Link href="/" className="p-5">
            Forgot password?
          </Link>
          <p className="pt-2 text-2 self-center text-warm-grey400 custom-text-2">
            {"No account? "}
            <Link
              href={"/auth/register"}
              className="custom-text-2 text-orange400 underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
