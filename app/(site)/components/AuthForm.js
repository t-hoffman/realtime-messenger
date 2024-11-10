"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState, useActionState, useEffect } from "react";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const initialValues = {
  name: "",
  email: "",
  password: "",
  errors: {},
};

const wait = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState(LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === LOGIN) {
      setVariant(REGISTER);
    } else {
      setVariant(LOGIN);
    }
  }, [variant]);

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      if (variant === REGISTER) {
        try {
          await axios
            .post("/api/register", data)
            .then(() => signIn("credentials", data));
        } catch (err) {
          toast.error("Something went wrong!");
        }
      }

      if (variant === LOGIN) {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((response) => {
          if (response?.error) {
            toast.error("Invalid credentials");
          }

          if (response?.ok && !response?.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        });
      }

      return { ...data, errors: {} };
    },
    initialValues
  );

  const socialAction = (action) => {
    // setIsLoading(true);
    signIn(action, { redirect: false }).then((response) => {
      if (response?.error) {
        toast.error("Invalid credentials");
      }

      if (response?.ok && !response?.error) {
        toast.success("Logged in!");
      }
    });
    // .finally(() => setIsLoading(false));
  };

  // console.log(state.email);
  // console.log(isPending);

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" action={submitAction} noValidate>
          {variant === REGISTER && (
            <Input
              id="name"
              label="Name"
              type="name"
              disabled={isPending}
              required={true}
              errors={state.errors}
              value={state.name}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            disabled={isPending}
            required={true}
            errors={state.errors}
            value={state.email}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isPending}
            required={true}
            errors={state.errors}
            value={state.password}
          />
          <div>
            <Button type="submit" disabled={isPending} fullWidth>
              {variant === LOGIN ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
        <div className="flex gap-2 justify-center text-sm empty-6 mt-6 px-2 text-gray-500">
          <div>
            {variant === LOGIN
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === LOGIN ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
