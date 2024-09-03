"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

function MyOrders() {
  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [ordersList, setOrdersList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.replace("/");
      return;
    }
    getOrders();
  }, []);
  const getOrders = async () => {
    const fetchedOrders = await GlobalApi.getAllOrders(user.id, jwt);
    setOrdersList(fetchedOrders);
  };
  return (
    <div>
      <h2 className="text-center text-xl text-white bg-primary p-3">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Orders History</h2>
        <div>
          {ordersList.map((item, index) => {
            return (
              <Collapsible key={index}>
                <CollapsibleTrigger>
                  <div className="border p-2 bg-slate-100 flex justify-evenly gap-24">
                    <h2>
                      <span className="font-bold mr-2">Order Date:</span>{" "}
                      {moment(item?.createdAt).format("DD/MMM/YYY")}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Total Amount:</span>{" "}
                      {item?.totalOrderAmount}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Status:</span>{" "}
                      {item?.status}
                    </h2>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.orderItemList.map((order, orderIndex) => {
                    return <MyOrderItem orderItem={order} key={orderIndex} />;
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
