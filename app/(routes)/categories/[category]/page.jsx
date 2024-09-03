import React from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import CategoriesList from "../_components/CategoriesList";
import ProdcutsList from "@/app/_components/ProdcutsList";
async function ProductsByCategory({ params }) {
  const categoryList = await GlobalApi.getCategoryList();
  const prodcutsList = await GlobalApi.getProductsByCategory(params.category);

  return (
    <div>
      <h2 className="p-4 bg-primary text-3xl text-center text-white font-bold">
        {params.category}
      </h2>
      <CategoriesList
        categoryList={categoryList}
        selectedCatgory={params.category}
      />
      <div className="p-5 md:p-10">
        <ProdcutsList prodcutsList={prodcutsList} />
      </div>
    </div>
  );
}

export default ProductsByCategory;
