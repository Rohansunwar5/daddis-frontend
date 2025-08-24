// Home-OurProducts.tsx
import { ICategory, IProduct } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Skeleton } from "@mui/material";
import { optimizeCloudinaryUrl } from "../../utils/utility-functions";
import TiltedCard from "./Home-OurProductsAnimation";
import { LucideHeart } from "lucide-react";

interface HomeOurProductsProps {
  categories: ICategory[];
  topProducts?: IProduct[];
}

const HomeOurProducts = ({ categories, topProducts = [] }: HomeOurProductsProps) => {
  return (
    <div className="p-10 our-products-section">
      {/* ---------- Our Products (Categories) ---------- */}
      <h1 className="font-bold relative text-center text-xl">
        Our products
        <Link className="absolute right-0" to={"/category/all"}>
          <Button variant="ghost" className="underline">
            View all
          </Button>
        </Link>
      </h1>

      <div className="mt-8 grid w-full sm:grid-cols-3 grid-cols-1 justify-items-center gap-8 h-full">
        {categories.length === 0
          ? [0, 1, 2].map((number) => (
              <div key={number} className="w-[100%] col-span-1 max-w-sm">
                <Skeleton className="rounded-md w-[100%] aspect-square" />
                <Skeleton className="w-1/2 mt-2" />
              </div>
            ))
          : categories.map((category: ICategory) => (
              <div key={category.categoryName} className="w-[100%] col-span-1 max-w-sm">
                <Link to={`/category/${category._id}`} className="hover:cursor-pointer block">
                  <TiltedCard
                    imageSrc={optimizeCloudinaryUrl(category?.banners?.[0]?.imageUrl?.url)}
                    altText={`${category.categoryName} category`}
                    captionText={category.categoryName}
                    containerHeight="320px"
                    containerWidth="100%"
                    imageHeight="320px"
                    imageWidth="100%"
                    rotateAmplitude={8}
                    scaleOnHover={1.03}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="w-full bg-black bg-opacity-70 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
                          <h3 className="font-bold text-base text-center text-white">
                            {category.categoryName}
                          </h3>
                        </div>
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
      </div>

      {/* ---------- Best Sellers (Top Products) ---------- */}
      {/* ---------- Best Sellers (Top Products) ---------- */}
<div id="best-sellers-section" className="mt-16 best-sellers-section">
  <h1 className="font-bold text-xl mb-8 text-center">Best Sellers</h1>
  <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 justify-items-center">
    {topProducts.length === 0
      ? [0, 1, 2].map((num) => (
          <div key={num} className="w-[100%] col-span-1 max-w-xs">
            <Skeleton className="rounded-md w-[100%] aspect-square" />
            <Skeleton className="w-3/4 mt-2" />
            <Skeleton className="w-1/2 mt-1" />
          </div>
        ))
      : topProducts.slice(0, 3).map((product: IProduct) => (
          <div
            key={product._id}
            className="rounded-lg flex flex-col justify-center relative hover:shadow-lg transition w-full max-w-xs"
          >
            {/* Wishlist button */}
            <Button
              variant="ghost"
              className="p-0 m-0 hover:scale-125 absolute top-3 right-3 transition-all duration-150 w-10 h-10 rounded-full"
            >
              <LucideHeart className="hover:stroke-red-500 stroke-1" />
            </Button>

            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
              <img
                className="h-[75%] w-full object-cover rounded-md mb-3"
                src={optimizeCloudinaryUrl(product?.imageUrl?.[0]?.url)}
                alt={product.productName}
              />
            </Link>

            {/* Product Info */}
            <div className="px-2 text-center">
              <span className="font-semibold">{product.productName}</span>
              <span className="block text-slate-500 text-sm">
                {product?.weight?.number}
                {product?.weight?.unit}
              </span>
              <span className="block font-bold">₹ {product.price}</span>
            </div>
          </div>
        ))}
  </div>
</div>

    </div>
  );
};

export default HomeOurProducts;
