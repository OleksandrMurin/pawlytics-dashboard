"use client";
import { FormInput } from "@/components/FormInput";
import GoogleLogo from "@public/GoogleLogo.svg";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { Button } from "./Button";

export const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: () => {},
  });

  return (
    <div className="w-1/3 relative rounded-xl p-px bg-gradient-to-br from-[#111213] to-[#191A1C] shadow-[0_0_40px_rgba(0,0,0,0.3)]">
      <form className="bg-[#1B1B1D] p-4">
        <h1 className="font-bold text-4xl text-cream200 pt-8">
          Create an account
        </h1>
        <h2 className="font-semibold text-3xl text-sage600 pt-3">Hello!</h2>
        <button className="w-full mt-10 p-2 rounded-md border border-warm-grey200 bg-cream200 flex justify-center items-center">
          <Image src={GoogleLogo} alt="Google logo" />
          <p className={"font-bold text-xl text-warm-grey600 pl-4"}>
            Sign up with Google
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
              href={"/auth/login"}
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
