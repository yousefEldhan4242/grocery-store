"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductsItemDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const productPrice = useRef(
    product?.attributes?.sellingPrice
      ? product?.attributes?.sellingPrice
      : product?.attributes?.mrp
  );

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const router = useRouter();

  const [loader, setLoader] = useState();

  const addToCart = () => {
    setLoader(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoader(false);
      return;
    }
    const data = {
      data: {
        userId: user.id,
        mrp: product.attributes.mrp,
        quantity: quantity,
        amount: Number((quantity * productPrice.current).toFixed(2)),
        products: product.id,
        users_permissions_users: user.id,
      },
    };
    GlobalApi.addToCart(data, jwt).then(
      (res) => {
        setLoader(false);
        setUpdateCart(!updateCart);
        toast("Added To Cart Successfully");
      },
      (e) => {
        setLoader(false);
        toast("Error While Adding To Cart");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product?.attributes?.name}
        width={300}
        height={300}
        className="bg-slate-200 h-[320px] w-[300px] object-contain p-5 rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product?.attributes?.name}</h2>
        <h3 className="text-sm text-gray-500">
          {product.attributes.description}
        </h3>
        <div className="flex gap-3">
          {product.attributes.sellingPrice && (
            <h2 className={`font-bold text-3xl`}>
              ${product?.attributes?.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product?.attributes?.mrp}
          </h2>
        </div>
        <h4 className="font-medium text-lg">
          Quantity ({product?.attributes?.itemQuantityType})
        </h4>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="flex gap-10 items-center p-2 border px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="font-bold text-2xl">
              = ${(quantity * productPrice.current).toFixed(2)}
            </h2>
          </div>

          <Button disabled={loader} className="flex gap-3" onClick={addToCart}>
            <ShoppingBasket />
            {loader ? <LoaderCircle className="animate-spin" /> : "Add To Cart"}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category:</span>{" "}
          {product?.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductsItemDetails;
