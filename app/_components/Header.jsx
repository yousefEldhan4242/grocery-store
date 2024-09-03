"use client";

import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemsList from "./CartItemsList";
import { toast } from "sonner";

function Header() {
  const [categoriesList, setCategoriesList] = useState([]);
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const router = useRouter();
  const [cartItemsNum, setCartItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const deleteItem = (itemId) => {
    GlobalApi.deleteCartItem(itemId, jwt).then(
      (res) => {
        getCartItems();
        toast("Item Removed !");
      },
      (e) => {
        toast("Error While Removing Item");
      }
    );
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCartItems = async () => {
    if (jwt) {
      const cartItemsList = await GlobalApi.getCartItems(user.id, jwt);
      setCartItemsNum(cartItemsList?.length);
      setCartItems(cartItemsList);
    }
  };

  // get Categories
  const getCategoriesList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoriesList(res.data.data);
    });
  };

  const signOut = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cartItems]);
  return (
    <div className="flex justify-between p-5 shadow-sm select-none">
      <div className="w-[150px] h-[100px] flex items-center gap-8">
        <Image
          src={"/logo.jpg"}
          alt="logo"
          className="max-h-[100%] w-[85px] sm:w-[150px] cursor-pointer"
          width={150}
          height={100}
          onClick={() => router.push("/")}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="bg-slate-200 gap-2 hidden sm:flex items-center py-2 px-10 rounded-full border cursor-pointer">
              <LayoutGrid className="w-5 h-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoriesList.map((category, index) => {
              return (
                <Link
                  key={index}
                  href={"/categories/" + category.attributes.name}
                >
                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                        category?.attributes?.icon?.data[0]?.attributes?.url // the "?" is to make each thing optional
                      }
                      alt={"icon"}
                      width={30}
                      height={30}
                      unoptimized={true}
                    ></Image>
                    <h2 className="text-lg">{category?.attributes?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center border rounded-full py-2 gap-3 px-5">
          <Search />
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center text-lg gap-2">
              <ShoppingBasket className="w-7 h-7" />{" "}
              <span className="text-white px-2 bg-primary rounded-full">
                {cartItemsNum}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-bold bg-primary text-white text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemsList
                  cartItemsList={cartItems}
                  deleteItem={deleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-0 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal
                  <span>${subTotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  View Cart
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="bg-green-100 text-primary w-12 h-12 p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-orders"}>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
