import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function orderConfirmation() {
  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col justify-center items-center gap-3 p-20 border shadow-md rounded-md px-32">
        <CheckCircle2 className="w-24 h-24 text-primary" />
        <h2 className="font-medium text-3xl text-primary">Order Successfull</h2>
        <h2>Thank You So Much For Order</h2>
        <Link href={"/my-orders"}>
          <Button className="mt-8">Track your order</Button>
        </Link>
      </div>
    </div>
  );
}

export default orderConfirmation;
