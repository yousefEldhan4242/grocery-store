import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductsItemDetails from "./ProductsItemDetails";

function ProdcutItem({ product }) {
  return (
    <div className="p-2 md:p-6 flex-col flex items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <Image
        className="w-[200px] h-[200px] object-contain"
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={product?.attributes?.name}
      />
      <h2 className="font-bold text-lg">{product?.attributes?.name}</h2>
      <div className="flex gap-3">
        {product.attributes.sellingPrice && (
          <h2 className={`font-bold text-lg`}>
            ${product?.attributes?.sellingPrice}
          </h2>
        )}
        <h2
          className={`font-bold text-lg ${
            product.attributes.sellingPrice && "line-through text-gray-500"
          }`}
        >
          ${product?.attributes?.mrp}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:bg-primary hover:text-white duration-300"
          >
            Add To Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <ProductsItemDetails product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProdcutItem;
