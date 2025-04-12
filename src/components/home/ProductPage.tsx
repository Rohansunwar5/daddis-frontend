import { ChevronLeft, LucideHeart, LucideImageOff, ReceiptIndianRupeeIcon, ShoppingCart, Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner";
import { ToastSuccess, ToastWarning } from "../dashboard/productMain/AllProductsTable";
import { ICartItem, ICustomer, IProduct } from "../../utils/constants";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { updateCart, updateWishList } from "../../utils/utility-functions";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import 'swiper/css';
import { Card } from "../ui/card";
import { CardContent } from "@mui/material";

export const ProductPage = () => {

    const { id } = useParams();
    const [ productData, setProductData ] = useState<IProduct>(useSelector((state: any) => state.website.productData));
    const dispatch = useDispatch();
    const userData: ICustomer = useSelector((state: any) => state.website.customerData);
    const currentWishlist = userData?._id ? userData?.wishList : JSON.parse(localStorage.getItem("wishList")!) ;
    const currentCart: ICartItem[] = userData?._id ? userData?.cart : JSON.parse(localStorage.getItem("cart")!);
    const [ isInWishList, setIsInWishList ] = useState<boolean>(false);
    const [ isInCart, setIsInCart ] = useState<boolean>(false);
    const [ isWishListAddedButtonLoading, setIsWishListAddedButtonLoading ] = useState<boolean>(false);
    const [ isCartAddedButtonLoading, setIsCartAddedButtonLoading ] = useState<boolean>(false);
    
    useEffect(() => {
        (async function () {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}products/get-product/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const data = await response.json();
                console.log(data);
                if ( !response.ok ) throw new Error("Couldn't fetch the product, please refresh the page");
                setProductData(data.data); 
                // Todo: Check if this is a problem in production!!
                // setCurrentWishlist(data?.data?.wishList);
                // setIsInWishList(currentWishlist?.find((item: IProduct) => item?._id === data.data?._id) == undefined ? false : true);
                // setIsInCart(currentCart?.find((item: ICartItem) => item?.product._id === data.data?._id) == undefined ? false : true);
                // console.log(currentWishlist?.find((item: IProduct) => item?._id === data.data?._id), isInWishList, currentCart, currentWishlist);
                // console.log(currentWishlist, isInWishList, isInCart, currentCart, productData, data.data);
                // console.log(currentWishlist, productData);
            } catch (error: any) {
                toast.warning(error.message! || "Error while fetching product", { description: "Please refresh the page!", icon: <ToastWarning />})
            }
        })();
    }, [id]);

    useEffect(() => {
        setIsInWishList(currentWishlist?.find((item: IProduct) => item?._id === productData?._id) == undefined ? false : true);
        setIsInCart(currentCart?.find((item: ICartItem) => item?.product._id === productData?._id) == undefined ? false : true);
        console.log(currentWishlist?.find((item: IProduct) => item?._id === productData?._id), isInWishList, currentCart, currentWishlist);
        console.log(currentWishlist, isInWishList, isInCart, currentCart, productData, productData);
        console.log(currentWishlist, productData);
    }, [ productData ])
    
    // const [ currentIndex, setCurrentIndex ] = useState(0);

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
 
    useEffect(() => {
        if (!api) {
        return
        }
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="flex flex-col min-h-[calc(100vh-56px)] sm:flex-row w-full mt-14 sm:p-10">
            <div className="">
                <div className="w-full sm:py-5">
                    <Link to={"/"}>
                        <Button variant={"ghost"}><ChevronLeft /></Button>
                    </Link>
                </div>
                <div id="images" className="sm:ml-8 mt-4 flex sm:w-[450px] flex-col justify-center items-center">
                    <Carousel setApi={setApi} className="sm:ml-10 w-[60%] rounded-md">
                        <CarouselContent className="rounded-md">
                            {productData?.imageUrl ? productData?.imageUrl.length == 0 ? <div className="bg-gray-300 w-full ml-4 h-full aspect-square flex justify-center gap-4 flex-col items-center rounded-md"><LucideImageOff className="" />No product images present</div> : productData?.imageUrl.map((image) => {
                                return (<CarouselItem className="w-full">
                                    {/* <Card> */}
                                        {/* <CardContent> */}
                                            <img src={image?.url} className="rounded-md w-full h-full" />
                                        {/* </CardContent> */}
                                    {/* </Card> */}
                                </CarouselItem>)
                            }) : <div>Loading</div>}
                        </CarouselContent>
                        {(productData?.imageUrl || productData?.imageUrl?.length > 0) && <CarouselPrevious />}
                        {(productData?.imageUrl || productData?.imageUrl?.length > 0) && <CarouselNext />}
                    </Carousel>
                    {/* {productData?.imageUrl?.length !== 0 && <Carousel className="w-full max-w-[600px]">
                        <CarouselContent>
                            <CarouselItem key={productData?.imageUrl?.[currentIndex]?.url}>
                                {productData ? <img className="w-[600px] h-[600px] object-cover rounded-md" src={productData?.imageUrl?.[currentIndex]?.url} /> : <div className="rounded-lg flex justify-center items-center stroke-slate-700 w-[600px] h-[600px] bg-slate-300">
                                    <img className="w-[50px] h-[50px]" src="../../../public/loader.svg" alt="" />
                                </div>}
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>}

                    <Carousel className="w-full mt-4">
                        <CarouselContent className="-ml-1">
                            {productData?.imageUrl?.map((image, index) => (
                                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
                                    <div className="p-1">
                                        <img src={image?.url} onClick={() => {
                                            setCurrentIndex(index);
                                        }} className="hover:cursor-pointer h-[100px] w-[100px] object-cover rounded-md" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel> */}
                    {(productData?.imageUrl || productData?.imageUrl?.length > 0 || false) ? <div className="py-2 text-center font-[quicksand] text-sm text-muted-foreground">
                    {/* {(false) ? <div className="py-2 text-center font-[quicksand] text-sm text-muted-foreground"> */}
                        product image {current} of {productData?.imageUrl.length}
                    </div> : <></>}
                </div>
            </div>
            <div className="flex gap-10 flex-col sm:mt-32 mt-4 items-center font-[quicksand] flex-1">
                <div id="head" className="flex flex-col h-full gap-2">
                    <h1 className="font-bold text-3xl">{productData?.productName ? productData?.productName : <Skeleton className="h-8 w-56" />}</h1>
                    {/* <h1 className="font-bold text-3xl">{<Skeleton className="h-8 w-56" />}</h1> */}
                    <h3 className="text-lg text-gray-500 font-sans">{productData?.weight ? productData?.weight?.number!+productData?.weight?.unit! : <Skeleton className="h-5 w-20" />}</h3>
                    {/* <h3 className="text-lg text-gray-500 font-sans">{<Skeleton className="h-5 w-20" />}</h3> */}
                    <h3 className="text-lg">{productData?.price ? "₹"+productData?.price : <Skeleton className="h-5 w-14" />}</h3>
                    {/* <h3 className="text-lg">{<Skeleton className="h-5 w-14" />}</h3> */}
                    {productData?.productDescription !== "" && <h3 className="font-sans text-gray-500">{productData?.productDescription ? productData?.productDescription : <Skeleton className="h-4 w-full" />}</h3>}
                    {/* {productData?.productDescription !== "" && <h3 className="font-sans text-gray-500">{<Skeleton className="h-4 w-full" />}</h3>} */}
                </div>
                <div className="sm:grid sm:w-[500px] flex sm:grid-cols-6 justify-center items-center flex-col sm:grid-rows-2 gap-4 sm:gap-2">
                    {productData?._id ? <Button disabled={isCartAddedButtonLoading} onClick={async (e) => {
                        setIsCartAddedButtonLoading(true);
                        e.preventDefault();
                        if( isInCart )
                        {
                            await updateCart({ product: productData!, quantity: 1 }, false, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist);
                            setIsCartAddedButtonLoading(false);
                            setIsInCart(false);
                            return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                        }
                        await updateCart({ product: productData!, quantity: 1 }, true, false, currentCart, dispatch, userData?._id ? true : false, currentWishlist);
                        setIsCartAddedButtonLoading(false);
                        setIsInCart(true);
                        return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                    }} variant={"ghost"} className={cn("flex col-span-5 row-span-1 justify-center items-center gap-2 text-lg", isCartAddedButtonLoading && `bg-gray-100`)}>{isInCart ? "- Remove from cart " : "+ Add to cart "}<ShoppingCart className="stroke-1"/></Button> : <Skeleton className="row-span-1 col-span-5" />}
                    {productData?._id ? <Button onClick={async (e) => {
                        setIsWishListAddedButtonLoading(true);
                        e.preventDefault();
                        if( isInWishList )
                        {
                            await updateWishList(productData!, false, currentWishlist, dispatch, userData?._id ? true : false, currentCart);
                            setIsWishListAddedButtonLoading(false);
                            setIsInWishList(false);
                            return toast.success("Product deleted from wishlist successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                        }
                        await updateWishList(productData!, true, currentWishlist, dispatch, userData?._id ? true : false, currentCart);
                        setIsWishListAddedButtonLoading(false);
                        setIsInWishList(true);
                        return toast.success("Product added to wishlist successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                    }} variant={"ghost"} className="col-span-1 row-span-1 p-0 m-0 hover:scale-125 transition-all duration-150 w-10 h-10 rounded-full"><LucideHeart className={cn("hover:stroke-red-500 stroke-1", isInWishList && `fill-red-500 stroke-red-500`, (isWishListAddedButtonLoading) && `animate-ping`)}/></Button> : <Skeleton className="w-10 h-10 rounded-full" />}
                    {/* <Button disabled={isWishListAddedButtonLoading} variant={"ghost"} className="flex gap-4 justify-center items-center col-span-6 row-span-1">Buy now<ReceiptIndianRupeeIcon className=" stroke-1" /></Button> */}
                </div>
            </div>
        </div>
    );
};