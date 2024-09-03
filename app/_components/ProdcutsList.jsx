import React from "react";
import ProdcutItem from "./ProdcutItem";

function ProdcutsList({ prodcutsList }) {
  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {prodcutsList.map(
          (product, index) =>
            index < 8 && <ProdcutItem key={index} product={product} />
        )}
      </div>
    </div>
  );
}

export default ProdcutsList;
