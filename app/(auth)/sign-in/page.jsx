"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email, password)
      .then((res) => {
        setLoader(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.jwt);
        router.push("/");
        toast("Logined Successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast(error?.response?.data?.error?.message);
      });
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src={"/logo.jpg"} width={200} height={200} alt="logo" />
        <h2 className="text-3xl font-bold">Sign In To Account</h2>
        <h3 className="text-gray-500">
          Enter Your Email And Password To Sign In
        </h3>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={!(email && password)} onClick={onSignIn}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>Don't Have An Account ?</p>{" "}
          <Link href={"/create-account"} className="text-blue-500">
            Click Here To Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
