"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function CheckOut() {
  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartItemsNum, setCartItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }
    getCartItems();
  }, []);

  const getCartItems = async () => {
    if (jwt) {
      const cartItemsList = await GlobalApi.getCartItems(user.id, jwt);
      setCartItemsNum(cartItemsList?.length);
      setCartItems(cartItemsList);
    }
  };

  const handleApprove = (data) => {
    const payload = {
      data: {
        paymentId: data.paymentId.toString(),
        totalOrderAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zipCode,
        address: address,
        orderItemList: cartItems,
        userId: user.id,
      },
    };
    GlobalApi.createOrder(payload, jwt).then((res) => {
      toast("Order Placed Successfully !");
      cartItems.forEach((item) => {
        GlobalApi.deleteCartItem(item.id, jwt).then((res) => {});
      });
      router.replace("/order-confirmation");
    });
  };
  const tax = () => {
    return (subTotal * 0.09).toFixed(2);
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.amount;
    });
    setSubTotal(total.toFixed(2));
    setTotalAmount((total * 0.91 + 15).toFixed(2));
  }, [cartItems]);

  return (
    <div>
      <h2 className="text-center text-xl text-white bg-primary p-3">
        CheckOut
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="mx-20 md:col-span-2">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Zip Code"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({cartItemsNum})
          </h2>
          <div className="p-4 gap-4 flex flex-col">
            <h2 className="flex justify-between font-bold">
              Subtotal : <span>${subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Deliver <span>$15:00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) <span>${tax()}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Total : <span>${totalAmount}</span>
            </h2>
            {/* <Button onClick={() => handleApprove({ paymentId: "123" })}>
              Payment <ArrowBigRight />
            </Button> */}
            {totalAmount > 15 && (
              <PayPalButtons
                style={{ layout: "horizontal" }}
                onApprove={handleApprove}
                createOrder={(data, action) => {
                  return action.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: Number(totalAmount),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                disabled={!(username && zipCode && phone && email && address)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
