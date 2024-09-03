"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function CreateAccount() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.register(userName, email, password).then(
      (res) => {
        setLoader(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.jwt);
        router.push("/");
        toast("Account Created Successfully");
      },
      (e) => {
        setLoader(false);
        toast(e?.response?.data?.error?.message);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src={"/logo.jpg"} width={200} height={200} alt="logo" />
        <h2 className="text-3xl font-bold">Create An Account</h2>
        <h3 className="text-gray-500">
          Enter Your Email And Password To Create An Account
        </h3>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!(userName && email && password)}
            onClick={onCreateAccount}
          >
            {loader ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create An Account"
            )}
          </Button>
          <p>Already Have An Account</p>{" "}
          <Link href={"/sign-in"} className="text-blue-500">
            Click Here To Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
