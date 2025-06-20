import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, Heart, ImageOff, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"; 
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, ICategory, ICustomer, IProduct } from "../../utils/constants";
import { updateCart } from "../../utils/utility-functions";
import { toast } from "sonner";
import { ToastSuccess } from "../dashboard/productMain/AllProductsTable";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const ProductCard = ({ product, currentCart, dispatch, userData, currentWishList } : { product: IProduct, currentCart: ICartItem[], dispatch: Dispatch<UnknownAction>, userData: ICustomer, currentWishList: IProduct[] }) => {
    
    // const [ isWishListAddedButtonLoading, setIsWishListAddedButtonLoading ] = useState<boolean>(false);
    const [ isCartAddedButtonLoading, setIsCartAddedButtonLoading ] = useState<boolean>(false);
    const [ isInWishList, setIsInWishList ] = useState<boolean>(currentWishList?.filter((Item: IProduct) => Item?._id == product?._id).length == 0 ? false : true);
    const [ isInCart, setIsInCart ] = useState<boolean>(currentCart?.filter((Item: ICartItem) => Item?.product?._id == product?._id).length == 0 ? false : true);

    console.log(setIsInWishList);

    return (
        <div className="max-w-[250px] w-full col-span-1 justify-self-center relative rounded-lg shadow-xl">
            <img src={product?.imageUrl?.[0]?.url} className="border-none rounded-t-[inherit] object-cover w-full h-auto aspect-square" />
            <div className="w-full flex flex-col gap-2 p-4 h-1/3 rounded-b-[inherit]">
                <h3 className="font-[quicksand] text-xl">{product?.productName}</h3>
                <h6 className="text-gray-600">{product?.weight?.number + product?.weight?.unit}</h6>
                <h6 className="">{"₹"+product?.price}</h6>
                <Button className="flex justify-center items-center gap-4 w-full" variant={"ghost"} onClick={ async (e) => {
                    e.preventDefault();
                    setIsCartAddedButtonLoading(true);
                        e.preventDefault();
                        if( isInCart )
                        {
                            await updateCart({ product: product!, quantity: 1 }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishList);
                            setIsCartAddedButtonLoading(false);
                            setIsInCart(false);
                            return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                        }
                        await updateCart({ product: product!, quantity: 1 }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishList);
                        setIsCartAddedButtonLoading(false);
                        setIsInCart(true);
                        return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                }}>{isCartAddedButtonLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : isInCart ? "- Remove from cart" : "+ Add to cart " }<ShoppingCart /></Button>
            </div>
            <button className="absolute top-[3%] right-[5%]"><Heart className={cn("hover:stroke-red-500 hover:scale-110 transition-all duration-150", isInWishList && "stroke-red-500 fill-red-500")} /></button>
        </div>
    );
}

export const CategoriesPage = () => {

    const { name } = useParams();
    const productDataFromStore = useSelector((state : any) => state?.website?.productData);
    const [ products, setProducts ] = useState<Array<IProduct>>(productDataFromStore);
    const categories: ICategory[] = useSelector((state: any) => state?.website?.categories);
    const categoryBanner: ICategory[] = categories?.filter((category: ICategory) => {
        return category?._id === name
    }) || categories[0];
    const userData: ICustomer = useSelector((state: any) => state.website.customerData);
    const currentWishlist = userData?._id ? userData?.wishList : JSON.parse(localStorage.getItem("wishList")!) ;
    const currentCart: ICartItem[] = userData?._id ? userData?.cart : JSON.parse(localStorage.getItem("cart")!);

    const [ currentCategory, setCurrentCategory ] = useState<string>(name!);

    // useEffect(() => {
    //     // console.log("categoryBanners : ");
    //     // console.log(categoryBanner[0]?.banners[0]?.imageUrl?.url);
    //     console.log(products, productDataFromStore, categories, categoryBanner);
    //     setProducts(productDataFromStore?.filter((product: IProduct) => product?.productCategory?._id == name));
    // },  []);

    useEffect(() => {
        // console.log("categoryBanners : ");
        // console.log(categoryBanner[0]?.banners[0]?.imageUrl?.url);
        if ( name == "all") setProducts(productDataFromStore);
        else setProducts(productDataFromStore?.filter((product: IProduct) => product?.productCategory?._id === name));
        console.log(products, productDataFromStore, categories, categoryBanner);
    }, [ productDataFromStore, currentCategory ]);
    
    const dispatch = useDispatch();

    return (
        <div className="mt-[56px] font-[quicksand] flex w-full min-h-[calc(100vh-56px)]">
            <section id="side-bar" className="w-[300px] sm:block hidden p-4 relative border-r h">
                <Link className="" to={"/"}>
                    <ChevronLeft className="hover:scale-125 transition-all duration-300  mb-4 top-4 left-4" />
                </Link>
                <div className="flex flex-col items-center gap-4">
                    {categories?.map((category: ICategory) => {
                        // console.log(category?._id, name);
                        
                        // console.log(category?._id == currentCategory);
                        
                        return <Link onClick={() => {
                            setCurrentCategory(category?._id);
                        }} className={cn(` transition-all duration-150 py-4 w-full rounded-md text-center`, (category?._id == currentCategory) && `bg-yellow-300 text-white`, (category?._id != currentCategory && `hover:bg-gray-200`))} to={`/category/${category?._id}`}>
                            <p className="">{category?.categoryName}</p>
                        </Link>
                    })}   
                    {/* <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:no-underline flex justify-center items-center">
                            <span className="flex items-center justify-between w-full">
                                <p className="text-red-300">
                                    Other categories
                                </p>
                            </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex gap-4 flex-col">
                                {categories?.map((category: ICategory, index: number) => {
                                    return (
                                        <>
                                            {(index === 0) ? <></> : <Link to={""}>
                                                <p className={cn(index === 0 && "font-bold")}>{category?.categoryName}</p>
                                            </Link>}
                                        </>
                                    );
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> */}
                </div>
            </section>
            <section id="products" className="p-6 flex-1">
                <Link className="sm:hidden bg-blue-600" to={"/"}>
                    <ChevronLeft className="hover:scale-125 transition-all duration-300  mb-4 top-4 left-4" />
                </Link>
                {categoryBanner[0]?.banners[0]?.imageUrl?.url || categories[0]?.banners[0]?.imageUrl?.url ? <img src={categoryBanner[0]?.banners[0]?.imageUrl.url || categories[0]?.banners[0]?.imageUrl?.url } className="w-full sm:h-[350px] lg:h-[350px] relative md:h-[200px] h-[100px] object-top rounded-lg bg-gray-300 object-cover" alt="" /> : <div className="w-full h-[300px] rounded-lg bg-gray-300 object-cover flex justify-center items-center"><ImageOff /></div> }
                <div className="py-4 grid sm:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-center gap-4 justify-center" id="product-list">
                    {!products && <Loader2 className="w-4 h-4 animate-spin" />}
                    {products?.length == 0 && <p className="col-span-full text-center font-[quicksand] text-yellow-600 w-full h-full">No products under this category!</p>}
                    {products?.map((product) => {
                        return <ProductCard product={product} userData={userData} currentCart={currentCart} currentWishList={currentWishlist} dispatch={dispatch}/>
                    })}
                </div>
            </section>
        </div>
    ); 
};