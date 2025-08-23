import { ICategory } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Skeleton } from "@mui/material";
import { optimizeCloudinaryUrl } from "../../utils/utility-functions";
import TiltedCard from "./Home-OurProductsAnimation"; // Import the TiltedCard component

interface HomeOurProductsProps {
  categories: ICategory[];
}

const HomeOurProducts = ({ categories }: HomeOurProductsProps) => {
  return (
    <div className="p-10 our-products-section">
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
                <Link
                  to={`/category/${category._id}`}
                  className="hover:cursor-pointer block"
                >
                  <TiltedCard
                    imageSrc={optimizeCloudinaryUrl(category?.banners[0]?.imageUrl?.url)}
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
                          <h3 className="font-bold text-base text-center text-white">{category.categoryName}</h3>
                        </div>
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HomeOurProducts;