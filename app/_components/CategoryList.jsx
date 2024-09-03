import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Show By Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category, index) => {
          return (
            <Link
              href={"/categories/" + category.attributes.name}
              key={index}
              className="flex flex-col gap-2 items-center bg-green-50 rounded-lg p-3 group cursor-pointer hover:bg-green-500 duration-300"
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
              <h2 className="group-hover:text-white text-green-800 duration-300">
                {category?.attributes?.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
