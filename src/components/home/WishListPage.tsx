import { ChevronLeft, Loader2, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "../ui/button"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, ICustomer, IProduct } from "../../utils/constants";
import { toast } from "sonner";
import { ToastFaliure, ToastSuccess } from "../dashboard/productMain/AllProductsTable";
import { setCustomerData } from "../../redux/slices/websiteSlice";
import { updateCart, updateWishList } from "../../utils/utility-functions";
import { Dispatch } from "@reduxjs/toolkit";

// const wishlist: any[] = [
//     {
//         imgUrl: [],
//         productName: "Coconut ghee burfi",
//         weight: {
//             number: 200,
//             unit: "g"
//         },
//         price: 180
//     },
//     {
//         imgUrl: [],
//         productName: "Ghee soan papdi",
//         weight: {
//             number: 200,
//             unit: "g"
//         },
//         price: 190
//     },
//     {
//         imgUrl: [],
//         productName: "Coconut ghee burfi",
//         weight: {
//             number: 200,
//             unit: "g"
//         },
//         price: 180
//     },
//     {
//         imgUrl: [],
//         productName: "Ghee soan papdi",
//         weight: {
//             number: 200,
//             unit: "g"
//         },
//         price: 190
//     },
    // {
    //     imgUrl: [],
    //     productName: "Coconut ghee burfi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 180
    // },
    // {
    //     imgUrl: [],
    //     productName: "Ghee soan papdi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 190
    // },
    // {
    //     imgUrl: [],
    //     productName: "Coconut ghee burfi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 180
    // },
    // {
    //     imgUrl: [],
    //     productName: "Ghee soan papdi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 190
    // },
    // {
    //     imgUrl: [],
    //     productName: "Coconut ghee burfi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 180
    // },
    // {
    //     imgUrl: [],
    //     productName: "Ghee soan papdi",
    //     weight: {
    //         number: 200,
    //         unit: "g"
    //     },
    //     price: 190
    // }
// ];

const MoveToCartButton = ({ isPresentInCart, currentCart, setIsPresentInCart, dispatch, productData, isUserPresent } : { isPresentInCart: boolean, currentCart: ICartItem[], setIsPresentInCart: (value: boolean | ((prevState: boolean) => boolean)) => void, dispatch: Dispatch, productData: IProduct, isUserPresent: boolean }) => {

    const [ isButtonLoading, setIsButtonLoading ] = useState(false);

    return (
        <Button onClick={ async (event) => {
                event.preventDefault();
                setIsButtonLoading(true);
                if( isPresentInCart )
                    {
                        await updateCart({ product: productData!, quantity: 1 }, false, false, currentCart, dispatch, isUserPresent);
                        setIsButtonLoading(false);
                        setIsPresentInCart(false);
                        return toast.success("Product deleted from cart successfully!", { className: "font-[quicksand]", icon: <Trash2 className="w-4 h-4 stroke-red-500" /> });
                    }
                    await updateCart({ product: productData!, quantity: 1 }, true, false, currentCart, dispatch, isUserPresent);
                    setIsButtonLoading(false);
                    setIsPresentInCart(true);
                    return toast.success("Product added to cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });  
            }} variant={"ghost"} className="flex sm:text-[16px] text-[8px] justify-center items-center sm:gap-4">{isButtonLoading ? <Loader2 className="animate-spin sm:w-auto sm:h-auto h-3 w-3" /> : isPresentInCart ? <><ShoppingCart className="" /><span className="sm:block hidden">Remove from cart</span></> : <><ShoppingCart className="" /><span className="sm:block hidden">Move to cart</span></>}
        </Button>
    );
}

const WishListCard = ({ userData, product, wishList, setWishListData, cart } : { userData: ICustomer, product: IProduct, wishList: Array<IProduct>, setWishListData: React.Dispatch<React.SetStateAction<Array<IProduct>>>, cart: ICartItem[] }) => {

    const dispatch = useDispatch();
    const [ isXLoading, setIsXLoading ] = useState(false);
    const [ isPresentInCart, setIsPresentInCart ] =  useState<boolean>(cart.filter((cartItem: ICartItem) => cartItem?.product?._id == product?._id)[0] ? true : false);

    return (
        <div className="w-[100px] sm:w-[250px] bg-slate-200 relative rounded-lg">
            <img src={product?.imageUrl[0]?.url} alt="" className="sm:w-[250px] object-cover rounded-t-md w-[100px] h-[100px] sm:h-[250px]" />
            <div className="flex flex-col sm:text-[16px] text-xs gap-2 rounded-b-[inherit] p-4">
                <b>{product?.productName}</b>
                <p>{product?.weight?.number+product?.weight?.unit}</p>
                <p>₹{product?.price}</p>
                <MoveToCartButton isPresentInCart={isPresentInCart} currentCart={cart} dispatch={dispatch} setIsPresentInCart={setIsPresentInCart} productData={product} isUserPresent={userData?._id ? true : false} />
                <Button disabled={isXLoading} onClick={ async () => {
                    setIsXLoading(true);
                    await updateWishList(product, false, wishList, dispatch, userData?._id ? true : false, cart);
                    // const updatedWishList = wishList?.filter((item: IProduct) => item?._id !== product._id);
                    // console.log([updatedWishList.map((item: IProduct) => item._id)]);
                    // try {
                    //     // @ts-ignore
                    //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-wishlist`, {
                    //         method: "PATCH",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },
                    //         body: JSON.stringify({updatedWishList}),
                    //         credentials: "include", 
                    //     });

                    //     if ( !response.ok ) throw new Error("HTTP error! status: "+response?.status+", "+response?.statusText);

                    //     const data = await response.json();
                    //     console.log(data.data);
                    //     setWishListData(data?.data?.wishList);
                    //     dispatch(setCustomerData(data?.data));
                    //     toast.success("Wishlist updated successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> });
                        
                    // } catch (error: any) {
                    //     console.log(error);
                    //     toast.error("Error removing product, refresh!", { description: error, className: "bg-red-300 font-[quicksand]", icon: <ToastFaliure /> }, );
                    // }
                    setIsXLoading(false);
                }} className="absolute sm:top-5 sm:right-5 top-2 right-2 p-0 h-auto rounded-full bg-transparent hover:scale-110 hover:bg-transparent transition-all" variant={"ghost"}>{ isXLoading ? <Loader2 className="animate-spin" /> : <X className="fill-red-800 stroke-white sm:w-auto sm:h-auto h-3 w-3 hover:stroke-red-500 transition-all duration-150"/> }</Button>
            </div>
        </div>
    );
};

export const WishListPage = () => {

    const customerData: ICustomer = useSelector((state: any) => state.website.customerData);
    const [ wishListData, setWishListData ] = useState<Array<IProduct>>([]);
    const [ cart, setCart ] = useState<Array<ICartItem>>([]);

    console.log(typeof wishListData, wishListData?.length, typeof JSON.parse(localStorage.getItem("wishList")!))

    useEffect(() => {
        setWishListData(customerData?._id ? customerData?.wishList : JSON.parse(localStorage.getItem("wishList")!));
        // console.log(wishList, wishListData);
        setCart(customerData?._id ? customerData?.cart : JSON.parse(localStorage.getItem("cart")!));
    }, [ customerData ]);
    

    return (
        <div className={cn("mt-[56px] w-full min-h-[calc(100vh-56px)] font-[quicksand]", (wishListData?.length === 0 && ""))}>
            <div className="w-full h-24 flex items-center sm:px-10">
                <Link to={"/"}>
                    <Button variant={"ghost"} className="flex justify-center items-center sm:gap-8 hover:bg-transparent hover:scale-110 transition-all duration-200 back-button text-xl ">
                        <ChevronLeft /><div>WishList page</div>
                    </Button>
                </Link>
            </div>
            {wishListData?.length == 0 ? <p className="flex justify-center items-center min-h-[calc(100vh-(56px+96px))] text-2xl">No items wishlisted😢</p> : 
            <>
                <div className="wish-list-grid sm:grid-cols-4 grid-cols-2 h-auto w-full gap-10 p-10 pt-0 grid">
                    {wishListData?.map((product: IProduct) => <WishListCard userData={customerData} key={product._id} product={product} cart={cart} wishList={wishListData} setWishListData={setWishListData}/>)}
                </div> 
            </>}
        </div>
    );
};