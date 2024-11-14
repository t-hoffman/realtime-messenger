"use client";

import { useCallback, useState, useActionState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER_MUTATION } from "@/db/queries/userMutations";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const initialValues = {
  name: "",
  email: "",
  password: "",
  errors: {},
};

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState(LOGIN);
  const [createUser] = useMutation(CREATE_NEW_USER_MUTATION);

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
        createUser({ variables: { input: data } })
          .then(() => signIn("credentials", data))
          .catch(() => toast.error("Something went wrong!"));
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
    signIn(action, { redirect: false }).then((response) => {
      if (response?.error) {
        toast.error("Invalid credentials");
      }

      if (response?.ok && !response?.error) {
        toast.success("Logged in!");
      }
    });
  };

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
              disabled={isPending}
              required={true}
              errors={state.errors}
              value={state.name}
            />
          )}
          <Input
            id="email"
            label="Email address"
            disabled={isPending}
            required={true}
            errors={state.errors}
            value={state.email}
          />
          <Input
            id="password"
            label="Password"
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
