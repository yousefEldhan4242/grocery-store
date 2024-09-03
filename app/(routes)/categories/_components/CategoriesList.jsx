import React from "react";
import Image from "next/image";
import Link from "next/link";

async function CategoriesList({ selectedCatgory, categoryList }) {
  return (
    <div className="flex justify-center mx-7 md:mx-20 gap-5 mt-2 overflow-auto">
      {categoryList.map((category, index) => {
        return (
          <Link
            href={"/categories/" + category.attributes.name}
            key={index}
            className={`flex flex-col min-w-[100px] shrink-0 w-[150px] gap-2 items-center rounded-lg p-3 group cursor-pointer ${
              selectedCatgory == category.attributes.name
                ? "bg-green-500"
                : "bg-green-50 hover:bg-green-500"
            }  duration-300`}
          >
            <Image
              // use the optional "?" to not throwing an error
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category?.attributes?.icon?.data[0]?.attributes?.url
              }
              width={50}
              height={50}
              alt="icon"
              className="group-hover:scale-125 duration-300 ease-in-out transition-all"
            />
            <h2
              className={`group-hover:text-white  ${
                selectedCatgory == category.attributes.name
                  ? "text-white"
                  : "text-green-500 hover:text-white"
              } duration-300`}
            >
              {category?.attributes?.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}

export default CategoriesList;
