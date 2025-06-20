import { Dispatch as StateDispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, ICustomer, IProduct } from "../../utils/constants";
import { toast } from "sonner";
import { ToastFaliure, ToastSuccess,
    //  ToastWarning
     } from "../dashboard/productMain/AllProductsTable";
import { clearCart, 
    // sendEmail, 
    updateCart } from "../../utils/utility-functions";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { setCustomerData } from "../../redux/slices/websiteSlice";

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
    if ( cart.length > 0 )
        cart?.forEach((item: ICartItem) => {
            total += item?.product?.price * item?.quantity;
        });
    return total;
};

const CartItem = ({ product, quantity, currentCart, dispatch, userPresent } : { dispatch: Dispatch<UnknownAction>, product: IProduct, total?: number, setTotal: StateDispatch<SetStateAction<number>>, quantity: number, cart?: ICartItem[], userPresent: boolean, currentCart: ICartItem[] }) => {

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
                        // setTotal(getCartTotal());
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
                    <Button variant="ghost" disabled={ (count <= 1 || isCartUpdating || isMinusButtonLoading) } size={"sm"} className="sm:w-auto sm:h-auto sm:p-2" onClick={ async (e) => {
                        e.preventDefault();
                        setIsCartUpdating(true);
                        setIsMinusButtonLoading(true);
                        if ( quantity == 1)
                        {

                            const result = await updateCart({ product, quantity }, false, false, currentCart, dispatch!, userPresent!);
                            result ? toast.success("Product removed from cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> }) : toast.error("Failed to remove product from the cart!", { className: "font-[quicksand]", icon: <ToastFaliure /> });
                            return setIsCartUpdating(false);
                        }
                        const result = await updateCart({ product, quantity }, false, true, currentCart, dispatch!, userPresent!);
                        result ? toast.success("Product removed from cart successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> }) : toast.error("Failed to remove product from the cart!", { className: "font-[quicksand]", icon: <ToastFaliure /> });
                    
                        setCount(count-1);
                        setIsMinusButtonLoading(false);
                        return setIsCartUpdating(false);
                        // handleQuantityChange(true);
                    }}>
                        <Minus className="w-3 h-3" />
                    </Button>
                    <p className="w-4 flex items-center text-[8px] sm:text-sm justify-center">{isCartUpdating ? <Loader2 className="animate-spin w-3 h-3" /> : count}</p>
                    <Button disabled={ isCartUpdating || isPlusButtonLoading } variant="ghost" className="w-1 h-1 sm:w-auto sm:h-auto sm:p-2" size={"sm"} onClick={ async (e) => {
                        e.preventDefault();
                        setIsPlusButtonLoading(true);
                        setIsCartUpdating(true);
                        const result = await updateCart({ product, quantity }, true, true, currentCart, dispatch!, userPresent!);
                        result ? toast.success("Product quantity updated successfully!", { className: "font-[quicksand]", icon: <ToastSuccess /> }) : toast.error("Failed to update product quantity!", { className: "font-[quicksand]", icon: <ToastFaliure /> });
                        setIsPlusButtonLoading(false);
                        setIsCartUpdating(false);
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
    let cart: ICartItem[] = []
    const [ isPlaceOrderButtonLoading, setIsPlaceOrderButtonLoading ] = useState(false);
    if ( userData?._id )
        cart = userData?.cart;
    else 
        cart = JSON.parse(localStorage.getItem("cart")!);
    const navigate = useNavigate();
    console.log(cart, userData)
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded");
        document.body.appendChild(script);
        setTotal(getCartTotal(cart));
    }, []);

    const dispatch = useDispatch();

    const [ total, setTotal ] = useState(getCartTotal(cart));
    
    // const handleCheckout = async () => {
    //     if ( !userData || !userData?._id )
    //         return toast.error("Please login/signup to continue!", { icon: <ToastFaliure /> });
    //     try {
            
    //     } catch (error) {
            
    //     }
    // };

    useEffect(() => {
        // setCart(userData?.cart);
        // if ( !(userData?._id) )
        //     setCart(JSON.parse(localStorage.getItem("cart")!));
        // console.log(cart, userData?._id);
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
                            <CartItem userPresent={userData?._id ? true : false} setTotal={setTotal} currentCart={cart} dispatch={dispatch} product={cartItem.product} quantity={cartItem.quantity}/>
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
            <Button disabled={ isPlaceOrderButtonLoading || cart.length <= 0 } className="mt-4 bg-yellow-500 hover:bg-yellow-700" onClick={ async (e) => {
                e.preventDefault();
                // await handleCheckout();
                if ( userData?._id == null )
                return toast.error("Please login/signup to continue!", { icon: <ToastFaliure /> });
                if ( !userData?.phoneNumber || userData?.phoneNumber == undefined || userData?.phoneNumber == null || Number.isNaN(userData?.phoneNumber))
                    return navigate("/set-shipping");
                e.preventDefault();
                setIsPlaceOrderButtonLoading(true);
                if ( userData?.address?.city == null )
                    return navigate("/set-shipping");
                // if ( userData?.address?.city == null )
                //     return navigate("/set-shipping");
                try {
                    // @ts-ignore
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}payment/create-order/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ cart: cart, paymentMethod: "Razorpay", deliveryAddress: userData?.address }),
                        // body: JSON.stringify({ options: {
                        //     // amount: (Math.round(total + ( total * (3 / 100))) * 100),
                        //     amount: (Math.round(total)),
                        //     // amount: (Math.round(100) * 100),
                        //     currency: "INR",
                        // }}),
                        credentials: "include"
                    });
                    // console.log(response);
        
                    if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                    
                    const data = await response.json();
                    console.log(data);

                    var options = {
                        // @ts-ignore
                        "key_id": import.meta.env.VITE_RAZORPAY_KEY_ID,
                        // @ts-ignore
                        "key": import.meta.env.VITE_RAZORPAY_KEY_ID,
                        "amount": (Math.round(cart?.reduce((total, item) => {
                            return total + item?.product?.price * item?.quantity;
                        }, 0)!) * 100),
                        "currency": "INR",
                        "name": "Daadis.in",
                        "description": "Test Transaction",
                        "image": "https://example.com/your_logo",
                        "order_id": data?.data?.razorpayOrder?.id, 
                        "handler": async function (res : any){
                            try {
                                console.log(res);
                                // @ts-ignore
                                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}payment/verify-payment`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ 
                                        razorpay_order_id: res.razorpay_order_id,
                                        razorpay_payment_id: res.razorpay_payment_id, 
                                        razorpay_signature: res.razorpay_signature,
                                    }),
                                    credentials: "include"
                                });
                                // console.log(response);
                                
                                if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                
                                console.log(res);

                                const data = await response.json();
                                console.log(data, response);

                                console.log(response);
                                // @ts-ignore
                                const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}orders/create-an-order`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ 
                                        order: {
                                            orderId: Math.round(Math.random() * 100000000 + 1),
                                            customerId: userData?._id,
                                            total: (Math.round(cart?.reduce((total, item) => {
                                                return total + item?.product?.price * item?.quantity;
                                            }, 0)!) || 0),
                                            // total: 0,
                                            deliveryAddress: userData?.address,
                                            orderStatus: "Paid",
                                            cart: userData?.cart,
                                            paymentMethod: "Razorpay",
                                            paymentID: res.razorpay_payment_id,
                                            note: "", // Add the note
                                        }
                                    }),
                                    credentials: "include"
                                });
                                // console.log(response);
                                
                                if (!orderResponse.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                                
                                console.log(orderResponse);
                                
                                const orderData = await orderResponse.json();


                                // @ts-ignore
                                // const emailToCusomter = await sendEmail({ from: import.meta.env.VITE_FROM_EMAIL, to: [ userData?.email, "rohraaaryan@gmail.com" ], subject : "Order placed at kultivated karats!", html:"Thank you for placing order at kultivated karats." });
                                // @ts-ignore
                                // const emailToOwner = await sendEmail({ from: import.meta.env.VITE_FROM_EMAIL, to: [ "info@kultivatedkarats.com", "sampathraj@ketandiamonds.com", "manishkumar@ketandiamonds.com", "deepaksagar@ketandiamonds.com", "mehek@kultivatedkarats.com", "rohraaaryan@gmail.com", "kultivatedkaratsarohance@gmail.com" ], subject : "Order received from kultivatedkarats.com!", html: getOrderEmailHtml() });

                                console.log(orderData, orderResponse);
                                dispatch(setCustomerData(orderData?.data));
                                await clearCart(dispatch, userData?._id ? true : false);
                                navigate("/payment-success");
                            } catch (error) {
                                console.log(error);
                            }
                        },
                        // modal: {
                        //     ondismiss: async function () {
                        //         console.log("Modal closed by user");
                        //         // @ts-ignore
                        //         const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}paytm/redeem-giftcard`, {
                        //             method: "POST",
                        //             headers: {
                        //                 "Content-Type" : "application/json"
                        //             },
                        //             credentials: "include",
                        //             body: JSON.stringify({
                        //                 "requestBody": {
                        //                     "request": {
                        //                         "brandMID": "PaytmGvTestBrand",
                        //                         "cardNumber": voucherOrGiftCardRef.current,
                        //                         // "cardPIN": encryptedPin,
                        //                         "orderId": "MERCHANT-ORDER-ID-1689584367474",
                        //                         "sourceMerchantMid": "PaytmGvTestReseller",
                        //                         "amount": 100,
                        //                         "redemptionMetaData": {
                        //                         "redeemerName": `${userData?.firstName} ${userData?.lastName}`,
                        //                         "redeemerMobileNumber": userData?.phoneNumber || "",
                        //                         "redeemerEmailId": userData?.email || "",
                        //                         // "redemptionStoreId":"pantaloonstore12345",
                        //                         // "redemptionStoreName":"Pantaloon sec 18 Noida",
                        //                         // "invoiceNumber":"12345678",
                        //                         "invoiceAmount": cartTotal
                        //                         },
                        //                         "source": "BRAND"
                        //                     }
                        //                 }
                        //             }),
                        //         });

                        //         const responseJSON = await response.json();

                        //         if ( !response.ok ) throw Error("Failed to redeem giftcard, please try again")
                                    
                        //         console.log(responseJSON.data.statusMessage);

                        //         if ( responseJSON.data.status == "FAILURE" ) {
                        //             setVoucherError(responseJSON.data.statusMessage);
                        //             return;
                        //         }
                        //     }
                        // },
                        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                            "name": `${userData?.firstName} ${userData?.lastName}`, //your customer's name
                            "email": `${userData?.email}`, 
                            "contact": `${userData?.phoneNumber || "0000000000"}`  //Provide the customer's phone number for better conversion rates 
                        },
                        // "notes": {
                        //     "address": "Razorpay Corporate Office"
                        // },
                        "theme": {
                            "color": "#BFA6A1"
                        }
                    };
                    // var rzp1 = new Razorpay(options);
                    const rzp = new (window as any).Razorpay(options);
                    rzp.open();
                    rzp.on("payment.failed", function (response: any) {
                        console.log("payment failed")
                        console.log(response)
                    });
                    // rzp.on("payment.success", async function (response: any) {

                    // });

                    e.preventDefault();
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsPlaceOrderButtonLoading(false);
                }

            }}>Checkout</Button>
        </div>
    );
};