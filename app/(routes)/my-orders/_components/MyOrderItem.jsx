import Image from "next/image";
import React from "react";

function MyOrderItem({ orderItem }) {
  return (
    <div className="w-[60%]">
      <div className="grid grid-cols-5 items-center mt-3 ">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            orderItem?.product?.data?.attributes?.images?.data[0]?.attributes
              ?.url
          }
          width={80}
          height={80}
          alt={orderItem.product.data.attributes.name}
          className="bg-gray-100 border p-5 rounded-md"
        />
        <div className="col-span-2">
          <h2>{orderItem?.product?.data?.attributes?.name}</h2>
          <h2>Item Price: {orderItem?.product?.data?.attributes?.mrp}</h2>
        </div>
        <h2>Quantity: {orderItem?.quantity}</h2>
        <h2>price: {orderItem?.amount}</h2>
      </div>
      <hr className="mt-3" />
    </div>
  );
}

export default MyOrderItem;
