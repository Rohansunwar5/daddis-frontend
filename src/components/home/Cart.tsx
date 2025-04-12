import { Dispatch as StateDispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, ICustomer, IProduct } from "../../utils/constants";
import { toast } from "sonner";
import { ToastFaliure, ToastSuccess, ToastWarning } from "../dashboard/productMain/AllProductsTable";
import { updateCart } from "../../utils/utility-functions";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

// const shoppingCart = {
//     products: [
//         {
//             productId: 500,
//             productName: "Garlic butter khakhra",
//             productDescription: "This one is a must buy",
//             productCategory: "Khakhra",
//             imageUrl: [],
//             price: 85,
//             stock: 478,
//             weight: {
//                 number: 180,
//                 unit: "g"
//             },
//             vegetarian: true
//         },
//     ],
//     note: ""
// }

const getCartTotal = (cart: ICartItem[]) => {
    let total: number = 0;
    console.log(cart);
    // if ( cart.length > 0 )
    //     cart?.forEach((item: ICartItem) => {
    //         total += item?.product?.price * item?.quantity;
    //     });
    return total;
};

const CartItem = ({ product, quantity, currentCart, dispatch, userPresent } : { dispatch: Dispatch<UnknownAction>, product: IProduct, total?: number, setTotal?: StateDispatch<SetStateAction<number>>, quantity: number, cart?: ICartItem[], userPresent: boolean, currentCart: ICartItem[] }) => {

    const [count, setCount] = useState(quantity);
 
    useEffect(() => {
        // setTotal(getTotal());
    }, []);

    const [ isPlusButtonLoading, setIsPlusButtonLoading ] = useState(false); 
    const [ isMinusButtonLoading, setIsMinusButtonLoading ] = useState(false); 

    console.log(product);

    const [ isCartUpdating, setIsCartUpdating ] = useState(false);

    return (
        <>
            <div className="gap-2 sm:gap-4 col-span-2 items-center grid grid-cols-2">
                <div className="relative">
                    <img src={product?.imageUrl ? product?.imageUrl[0]?.url : ""} width={300} height={300} className="object-cover sm:w-[300px] rounded-md w-[50px] h-[auto] aspect-square col-span-1" alt="" />
                    <Button disabled={isCartUpdating} className="absolute top-0 translate-x-1/2 -translate-y-1/2 z-10 right-0 h-auto w-auto p-1 rounded-full fill-white bg-red-500 hover:scale-125 transition-all hover:bg-red-500" onClick={async () => {
                        setIsCartUpdating(true);
                        const result = await updateCart({ product, quantity }, false, false, currentCart, dispatch!, userPresent!);
                        result ? toast.success("Product removed from cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> }) : toast.error("Failed to remove product from the cart!", { className: "font-[quicksand]", icon: <ToastFaliure /> });
                        setIsCartUpdating(false);
                    }}><X className="w-3 h-3" /></Button>
                    {isCartUpdating && <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100/50 rounded-md flex justify-center items-center"><Loader2 className="animate-spin stroke-gray-600" /></div>}
                </div>
                <div className="flex p-1 sm:p-4 flex-col gap-2 text-sm sm:gap-4  col-span-1">
                    <h4 className="text-gray-600">{product?.productName}</h4>
                    <h4 className="text-gray-600 text-sm">{product?.weight?.number + product?.weight?.unit}</h4>
                </div>
            </div>
            <p className="col-span-1 text-gray-600 flex p-4">{"₹"+product?.price}</p>
            <div className="sm:p-4 col-span-1 space-x-2">
                <span className="inline-flex items-center text-xs font-[quicksand] rounded-md justify-between">
                    <Button variant="ghost" disabled={(count <= 1 || isCartUpdating)} size={"sm"} className="sm:w-auto sm:h-auto sm:p-2" onClick={(e) => {
                        e.preventDefault();
                        setCount(count-1);
                        // handleQuantityChange(true);
                    }}>
                        <Minus className="w-3 h-3" />
                    </Button>
                    <p className="w-4 flex items-center text-[8px] sm:text-sm justify-center">{isCartUpdating ? <Loader2 className="animate-spin w-3 h-3" /> : count}</p>
                    <Button disabled={isCartUpdating} variant="ghost" className="w-1 h-1 sm:w-auto sm:h-auto sm:p-2" size={"sm"} onClick={(e) => {
                        e.preventDefault();
                        setCount(count+1);
                        // handleQuantityChange(false);
                    }}>
                        <Plus className="w-1 h-1 sm:w-3 sm:h-3" />
                    </Button>
                </span>
            </div>
            <p className="col-span-1 text-gray-600 justify-end flex p-4">{isCartUpdating ? <Loader2 className="animate-spin" /> : "₹"+(product?.price * count)}</p>
        </>
    )
}

export const Cart = () => {

    const userData: ICustomer = useSelector((state: any) => state?.website?.customerData);
    let cart: ICartItem[] = [];
    if ( userData?._id )
        cart = userData?.cart;
    else 
        cart = JSON.parse(localStorage.getItem("cart")!);

    console.log(cart, userData)

    const dispatch = useDispatch();

    const [ total, setTotal ] = useState(getCartTotal(cart));
    
    const handleCheckout = async () => {
        if ( !userData || !userData?._id )
            toast.error("Please login/signup to continue!", { icon: <ToastFaliure /> });
    }

    useEffect(() => {
        console.log(cart, userData);
        if ( userData?._id )
            cart = userData?.cart;
        else 
            cart = JSON.parse(localStorage.getItem("cart")!);
        setTotal(getCartTotal(cart));
    }, [userData]);

    return (
        <div id="cart-page" className="flex font-[quicksand] text-sm items-center min-h-[calc(100vh-56px)] justify-between py-[5%] flex-col w-full mt-14">
            <h1 className="font-[quicksand] mb-[4%] text-xl">Shopping cart</h1>
            <div className="grid grid-cols-5 px-3 sm:p-6 sm:w-[60%]">
                <p className="col-span-2 mb-4">Product</p>
                <p className="col-span-1">Price</p>
                <p className="col-span-1">Quantity</p>
                <p className="col-span-1 justify-self-end">Total</p>
                {cart && (cart?.length == 0) && <p className="text-xl font-[quicksand] w-full col-span-full h-[20vh] flex justify-center items-center font-bold">Cart empty!!</p>}
                <hr className="col-span-5 w-[98%] m-auto mb-4"/>
                    {(cart as Array<ICartItem>)?.map((cartItem: ICartItem) => {
                        // setTotal(total+product.price);
                        return (<>
                            <CartItem userPresent={userData?._id ? true : false} currentCart={cart} dispatch={dispatch} product={cartItem.product} quantity={cartItem.quantity}/>
                            <hr className="col-span-5 mx-auto my-3 w-[95%] self-center text-center" />
                        </>)
                    })}
                {/* <hr className=""/> */}
                <div className="border-y border-y-black col-span-5 p-4 flex justify-between my-10">
                    <p>Subtotal</p>
                    <p>₹{total}</p>
                </div>
            </div>
            <div className="mt-6 sm:px-0 px-4 flex items-center font-[quicksand] justify-center gap-4 flex-col">
                <p>Add a note to your order</p>
                <Textarea placeholder="Note" className="resize-none sm:w-96 focus-visible:ring-yellow-500"/>
                <p className="text-center">Tax included and shipping calculated at checkout</p>
            </div>
            <Button className="mt-4 bg-yellow-500 hover:bg-yellow-700" onClick={ async (e) => {
                e.preventDefault();
                await handleCheckout();
            }}>Checkout</Button>
        </div>
    );
};