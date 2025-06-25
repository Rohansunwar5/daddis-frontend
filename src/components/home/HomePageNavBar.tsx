import { Link, 
    // useNavigate
 } from "react-router-dom";
import { Button } from "../ui/button";
import { CircleHelp,
    // Eye, EyeOff,
     Headset, HeartCrack, HomeIcon,
    //   Loader2,
      LoaderCircle, LogIn, LogOut, LucideHeart,
    //    Settings,
        ShoppingCart, Store, UserCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import { yellow } from "@mui/material/colors";
import { Avatar
    // , createTheme, IconButton, TextField, ThemeProvider 
} from "@mui/material";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { GoogleLogin } from "@react-oauth/google";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Squash as Hamburger } from 'hamburger-react';
import { slide as Menu } from 'react-burger-menu';
import gsap from "gsap";
import { resetCustomerData, setCustomerData } from "../../redux/slices/websiteSlice";
// import Cookies from "js-cookie";
import { Badge } from "../ui/badge";
import { ICartItem, ICategory, ICustomer, IProduct } from "../../utils/constants";
// import { updateCart, updateWishList } from "../../utils/utility-functions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { mergeCart } from "../dashboard/authentication/AuthenticationComponent";
import { toast } from "sonner";
import { ToastSuccess } from "../dashboard/productMain/AllProductsTable";

// export const loginFormSchema = z.object({
//     email: z.string().email("Invalid email, enter a valid email address!"),
//     password: z.string().min(8, { message: "Password must be 8 characters long"}).refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lower case character!"}).refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one upper case character!"}).refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), { message: "Password must contain at least one special character!"}).refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one numberic value!"})
// });

// export const signupFormSchema = z.object({
//     firstName: z.string().min(1, { message: "Enter your first name!"}),
//     lastName: z.string().min(1, { message: "Enter your last name!"}),
//     email: z.string().email("Invalid email, enter a valid email address!"),
//     phoneNo: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
//         message: 'Invalid phone number!',
//     }),
//     password: z.string().min(8, { message: "Password must be 8 characters long"}).refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lower case character!"}).refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one upper case character!"}).refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), { message: "Password must contain at least one special character!"}).refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one numberic value!"}),
//     confirmPassword: z.string().min(1, { message: "Please confirm your password!"})
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match!",
//     path: ['confirmPassword'],
// });

// const textFieldTheme = createTheme({
//     components: {
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     "& .MuiInputBase-root" : {
//                         color: `${yellow[600]}`,
//                     },
//                     "& .MuiInputLabel-root" : {
//                         // color: `${yellow[300]}`
//                     },
//                     "& .MuiInputLabel-root.Mui-focused" : {
//                         color: `${yellow[600]}`
//                     },
//                     "& .MuiOutlinedInput-root" : {
//                         "& filedset" : {
//                             borderColor: `${"purple"}`
//                         },
//                         '&:hover fieldset': {
//                             borderColor: `${yellow[500]}`,
//                           },
//                         '&.Mui-focused fieldset': {
//                             borderColor: `${yellow[600]}`,
//                         },
//                         '& .MuiOutlinedInput-input': {
//                             color: `${yellow[600]}`, 
//                         },
//                     },
//                 },
//             }
//         }
//     }
// });

const closeAuthDialog = () => {
    gsap.to("#auth-component", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            gsap.to("#auth-component", {
                display: "none",
                duration: 0,
            });
        }
    });
};

// const openAuthDialog = () => {
//     gsap.to("#auth-component", {
//         backdropFilter: 'blur(5px)',
//         display: "flex",
//         duration: 1
//     });
//     gsap.to("#auth-component", {
//         opacity: 100,
//         duration: 1
//     });
// };


export const AuthComponent = () => {

    // const [ isSignUp, setIsSignUp ] = useState(false);

    // const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    //     resolver: zodResolver(loginFormSchema),
    //     defaultValues: {
    //         email: "",
    //         password: ""
    //     }
    // });

    // const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    //     resolver: zodResolver(signupFormSchema),
    //     defaultValues: {
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //     }
    // });

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const [ isLoginButtonLoading, setIsLoginButtonLoading ] = useState(false);
    // const [ isSignUpButtonLoading, setIsSignUpButtonLoading ] = useState(false);

    // const onLoginFormSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    //     console.log(values);
    //     setIsLoginButtonLoading(true);
    //     Cookies.remove("refreshToken");
    //     Cookies.remove("accessToken");
    //     try {
    //         // @ts-ignore
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/login`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({email: values.email, password: values.password})
    //         });

    //         if (!response.ok) {
    //             const errData = await response.json();
    //             loginForm.setError(errData.errors[0].type, {type: "manual", message: errData.errors[0].errMsg})
    //             throw new Error("HTTP error! status: "+response.status);
    //         }

    //         console.log(response);
            
    //         const data = await response.json();

    //         // if ( data.data.user.role === "Admin" ) {
    //         //     loginForm.setError("email", { type: "manual", message: "Admin login not allowed!"})
    //         //     throw new Error("Admin login not allowed!");
    //         // }
            
    //         dispatch(setCustomerData(data.data.user));
    //         const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart")!);
    //         const wishList: IProduct[] = JSON.parse(localStorage.getItem("wishList")!);
    //         console.log(cart, wishList, data?.data?.user?.wishList, data?.data?.user?.cart);
    //         /* Todo: fix cart issue */
    //         cart?.map(async (item: ICartItem) => {
    //             const sameItem = data?.data?.user?.cart?.filter((cartItem: ICartItem) => item?.product?._id == cartItem?.product?._id).length > 0 ? true : false;
    //             console.log(sameItem, item);
    //             const result = await updateCart(item, true, sameItem, data?.data?.user?.cart, dispatch, true, data?.data?.user?.wishList);
    //             console.log(result);
    //         });
    //         wishList?.map(async (product: IProduct) => {
    //             const isItemPresent = data?.data?.user?.wishList?.filter((item: IProduct) => product._id == item._id).length > 0 ? true : false;
    //             console.log(isItemPresent);
    //             if ( isItemPresent ) return;
    //             await updateWishList(product, true, data?.data?.user?.wishList, dispatch, true);            
    //         });
    //         // localStorage.setItem("cart", JSON.stringify("[]"));
    //         // localStorage.setItem("wishList", JSON.stringify("[]"));
    //         console.log(data.data.user);
    //         loginForm.reset();
    //         gsap.to("#auth-component", {
    //             opacity: 0,
    //             display: "none"
    //         });
    //     } catch (error) {
    //         console.error("Error: ", error);
    //     }
    //     setIsLoginButtonLoading(false);
    // };

    // const onSignUpFormSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    //     console.log(values);
    //     setIsLoginButtonLoading(true);
    //     try {
    //         // @ts-ignore
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/register`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({
    //                 firstName: values.firstName,
    //                 lastName: values.lastName,
    //                 email: values.email,
    //                 password: values.password,
    //                 role: "Customer",
    //                 luckyPoints: 0,
    //                 emailVerified: false,
    //                 phoneNoVerified: false,
    //             })
    //         });

    //         if (!response.ok) {
    //             const errData = await response.json();
    //             console.log(errData.errors[0]);
                
    //             signupForm.setError(errData.errors[0].type, {type: "manual", message: errData?.errors[0]?.message})
    //             throw new Error("HTTP error! status: "+response.status);
    //         }

            
    //         const data = await response.json();
            
    //         console.log(data);
            

    //         // if ( data?.data?.user?.role !== "Customer" ) {
    //         //     loginForm.setError("email", { type: "manual", message: "Unauthorized user!"})
    //         //     throw new Error("Unauthorized user");
    //         // }
    //         onLoginFormSubmit(values);

    //     } catch (error) {
    //         console.error(error);
    //     }
    //     setIsLoginButtonLoading(false);
    // };

    // const [ showPassword, setShowPassword ] = useState(false);
    // const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);


    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };

    return (
        // <div className={cn(`w-full font-[quicksand] flex justify-center items-center`)}>
            <div id="auth-component" className="rounded-lg relative shadow-xl sm:m-0 m-8 gap-4 flex flex-col justify-center items-center bg-gray-100 text-center z-[1000] w-[400px] p-[3%]">
                <Button className="absolute top-4 h-auto rounded-full p-0 right-4" variant={"ghost"} onClick={(e) => {
                    e.preventDefault();
                    gsap.to("#auth-component", {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            gsap.to("#auth-component", {
                                display: "none",
                                duration: 0,
                            });
                        }
                    });
                }} ><X className="w-6 h-6 p-1 border hover:stroke-white hover:bg-yellow-300 transition-all border-yellow-300 stroke-gray-500 rounded-full" /></Button>
                <img src={"/logo.svg"} className="w-[80px]"/>
                {/* <h1>{isSignUp ? "Start your experience with Daadi's" : "Login to continue shopping!"}</h1> */}
                <h1>{`Continue with google!`}</h1>
                <div className="w-full flex justify-center items-center" >
                    <GoogleLogin shape="circle" onSuccess={ async (credintialResponse) => {
                        try {
                            console.log(credintialResponse);
                            // @ts-ignore
                            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/google/login`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: 'include',
                                body: JSON.stringify({ token: credintialResponse?.credential })
                            });
                    
                            if (!response.ok) {
                                console.log(response)
                                throw new Error("HTTP error! status: "+response.status);
                            }
                    
                            console.log(response);
                            
                            const data = await response.json();
                            
                            console.log(data);

                            const guestCart = JSON.parse(localStorage.getItem('cart')!);
                            // const guestVideoCallCart = JSON.parse(localStorage.getItem('videoCallCart')!);
                            // const guestWishList = JSON.parse(localStorage.getItem('wishList')!);

                            console.log(guestCart, guestCart?.length);

                            const mergedCart = mergeCart(guestCart, data?.data?.user?.cart);

                            // @ts-ignore
                            const updateCartResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/update-user-cart`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ updatedCart: mergedCart }),
                                credentials: "include"
                            });

                            console.log(updateCartResponse);

                            if (!updateCartResponse.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                            
                            const updateCartData = await updateCartResponse.json();

                            // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
                            // dispatch(setCustomerData(updateCartData.data));
                            console.log(updateCartData);
                            // return true;
                            // guestWishList.forEach((item : IWishListItem) => {
                            //     if ( guestWishList?.filter((wishListItem : IWishListItem) => wishListItem?.product?._id == item?.product?._id)?.length > 0 )
                            //         return
                            //     updateWishList(item, true, data?.data?.user?.wishList, dispatch, true, data?.data?.user?.cart, data?.data?.user?.videoCallCart);
                            // });

                            // guestVideoCallCart.forEach((item : ICartItem) => {
                            //     if ( guestVideoCallCart?.filter((cartItem : ICartItem) => cartItem?.product?._id == item?.product?._id)?.length > 0 )
                            //         return;
                            //     updateVideoCallCart(item, true, false, data?.data?.user?.cart, dispatch, true, data?.data?.user?.videoCallCart, data?.data?.user?.wishList);
                            // });

                            // const currentUserResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/current-user`, {
                            //     method: "GET",
                            //     headers: {
                            //         "Content-Type": "application/json",
                            //     },
                                // credentials: "include"
                            // });
                            // console.log(currentUserResponse);
                
                            // if (!currentUserResponse.ok) {
                            //   if ( currentUserResponse.statusText == "Unauthorized" || currentUserResponse.status == 401 ) {
                                // console.log(await createGuestUser());
                            //   }
                            //   throw new Error("HTTP error! status: "+currentUserResponse.status+", "+currentUserResponse.statusText);
                            // }
                            // const currentUserData = await currentUserResponse.json();
                
                            // console.log("currentUserData?.data: ", currentUserData?.data, "data?.data: ", data?.data);
                
                            // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
                            // dispatch(setCustomerData(currentUserData.data));
                
                            dispatch(setCustomerData({ ...data?.data?.user, cart: updateCartData?.data?.cart }));
                            toast.success("Logged In successfully!", { icon: <ToastSuccess />, className: "!inria-serif-regular !border-[#A68A7E] !text-[#A68A7E] !bg-white" });
                            closeAuthDialog();

                        } catch (error) {
                            console.log(error);
                        }
                    }}/>
                    {/* {!isSignUp ? (<Form {...loginForm} key={"login-form"}>
                        <form className="w-full flex flex-col justify-center gap-4 items-center" onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}>
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} fullWidth size="small" label="Email" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>;
                                }}
                            />
                            <FormField
                                name="password"
                                control={loginForm.control}
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center gap-4 items-center flex-col">
                                        <FormControl className="p-0 m-0">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} InputProps={{
                                                    endAdornment: <IconButton onClick={handleClickShowPassword}>{showPassword ? <Eye className="w-4 h-4"/> : <EyeOff  className="w-4 h-4"/>}</IconButton>
                                                }} type={showPassword ? "text" : "password"}  fullWidth size="small" label="Password" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>    
                                }}
                            />
                            <div className="flex items-end justify-between w-full">
                                <Button disabled={isLoginButtonLoading} className="mt-4 text-black underline text-xs w-auto flex items-end p-0 h-auto hover:text-yellow-500 hover:bg-transparent" type="button" variant={"ghost"} onClick={() => {
                                    setIsSignUp(!isSignUp);
                                }}>{isSignUp ? "Already have an account? Log in!" : "Don't have one? Create now!"}</Button> 
                                <Button disabled={isLoginButtonLoading} className="mt-4 w-16 self-end bg-yellow-100 text-yellow-300 hover:text-white hover:bg-yellow-300" variant={"ghost"} type="submit">{isLoginButtonLoading ? <Loader2 className="animate-spin" /> : "Login"}</Button> 
                            </div>
                        </form>
                    </Form>) : (<Form {...signupForm} key={"signup-form"}>
                        <form className="w-full flex flex-col gap-4 justify-center items-center" onSubmit={signupForm.handleSubmit(onSignUpFormSubmit)}>
                            <FormField
                                control={signupForm.control}
                                name="firstName"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} fullWidth size="small" label="First name" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>;
                                }}
                            />
                            <FormField
                                control={signupForm.control}
                                name="lastName"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} fullWidth size="small" label="Last name" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage className="" />
                                    </FormItem>;
                                }}
                            />
                            <FormField
                                control={signupForm.control}
                                name="email"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} fullWidth size="small" label="Email" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>;
                                }}
                            />
                            <FormField
                                control={signupForm.control}
                                name="phoneNo"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} fullWidth size="small" label="Phone no." type="number" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>;
                                }}
                            />
                            <FormField
                                name="password"
                                control={signupForm.control}
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="p-0 m-0">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} InputProps={{
                                                    endAdornment: <IconButton onClick={handleClickShowPassword}>{showPassword ? <Eye className="w-4 h-4"/> : <EyeOff  className="w-4 h-4"/>}</IconButton>
                                                }} type={showPassword ? "text" : "password"}  fullWidth size="small" label="Password" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>    
                                }}
                            />
                            <FormField
                                name="confirmPassword"
                                control={signupForm.control}
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center items-center flex-col">
                                        <FormControl className="p-0 m-0">
                                            <ThemeProvider theme={textFieldTheme}>
                                                <TextField {...field} InputProps={{
                                                    endAdornment: <IconButton onClick={handleShowConfirmPassword}>{showConfirmPassword ? <Eye className="w-4 h-4"/> : <EyeOff  className="w-4 h-4"/>}</IconButton>
                                                }} type={showConfirmPassword ? "text" : "password"}  fullWidth size="small" label="Confirm password" variant="outlined" className="" />
                                            </ThemeProvider>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>    
                                }}
                            />
                            <div className="flex items-end justify-between w-full">
                                <Button disabled={isLoginButtonLoading} className="mt-4 text-black underline text-xs w-auto flex items-end p-0 h-auto hover:text-yellow-500 hover:bg-transparent" type="button" variant={"ghost"} onClick={() => {
                                    setIsSignUp(!isSignUp);
                                }}>{isSignUp ? "Already have an account? Log in!" : "Don't have one? Create now!"}</Button> 
                                <Button disabled={isLoginButtonLoading} className="mt-4 w-16 self-end bg-yellow-100 text-yellow-300 hover:text-yellow-500 hover:bg-yellow-300" variant={"ghost"} type="submit">{isLoginButtonLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}</Button> 
                            </div>
                        </form>
                    </Form>)} */}
                </div>
            </div>
        // {/* </div> */}
    );
};

export const HomePageNavBar = () => {

    const categories: ICategory[] = useSelector((state: any) => state?.website?.categories);
    const productDataFromStore: IProduct[] = useSelector((state : any) => state?.website?.productData);
    const customerData: ICustomer = useSelector((state: any) => state?.website?.customerData);
    const [ currentWishlist, setCurrentWishList ] = useState<Array<IProduct>>([]);
    const [ currentCart, setCurrentCart ] = useState<Array<ICartItem>>([]);
    const productDropMenuRef = useRef(null);
    // const navigate = useNavigate();

    useEffect(() => {
        setCurrentWishList(customerData?._id ? customerData?.wishList : JSON.parse(localStorage.getItem("wishList")!));
        setCurrentCart(customerData?._id ? customerData?.cart : JSON.parse(localStorage.getItem("cart")!));
    }, [customerData])

    console.log(currentCart, currentWishlist, currentCart?.length, currentWishlist?.length)

    const [ isProductPageVisible, setIsProductPageVisible ] = useState(false);
    const [ isHamburgerMenuOpen, setIsHamburgerMenuOpen ] = useState(false);

    const [ isLogoutButtonLoading, setIsLogoutButtonLoading ] = useState(false);
    const dispatch = useDispatch();
    
    const handleLogOut = async () => {
        setIsLogoutButtonLoading(true);
        try {
            // @ts-ignore
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error("HTTP error! status: "+response.status);

            const data = await response.json();
            
            // navigate("/admin/auth");
            dispatch(resetCustomerData());
            localStorage.setItem("cart", JSON.stringify([]));
            localStorage.setItem("wishList", JSON.stringify([]));
            console.log(data);
        } catch (error) {
            console.error("Error: ", error);
        }
        setIsLogoutButtonLoading(false);
    };

    const [isPopOverOpen, setIsPopOverOpen] = useState(false);

    return (
        <div className="z-[100] font-[quicksand] bg-white scroll-smooth w-full top-0 fixed justify-center items-center flex h-14">
            <section id="auth-component" className="opacity-0 z-[100] hidden absolute top-0 left-0 right-0 h-screen justify-center items-center bottom-0">
                <AuthComponent />
            </section>
            <div className="sm:flex hidden justify-evenly font-[quicksand] gap-4 items-center flex-1">
                <Link to={"/"} className="text-sm capitalize font-[quicksand] transition-all duration-150 hover:bg-slate-500/10 flex justify-center items-center px-2 py-1 rounded-sm">
                    HOME
                </Link>
                <button onClick={() => {
                    setIsProductPageVisible(!isProductPageVisible);
                }} className="text-sm capitalize transition-all z-[0] relative duration-150 hover:bg-slate-500/10 flex justify-center items-center px-2 py-1 rounded-sm">
                    PRODUCTS
                </button>
                    {isProductPageVisible && <div ref={productDropMenuRef} className="absolute p-4 gap-4 flex flex-col flexw max-h-[500px] flex-wrap rounded-lg w-[500px] top-[110%] left-[10%] bg-gray-100">
                        {categories?.map((category: ICategory) => {
                            return (
                                <div className="text-left">
                                    <span className="capitalize col-span-1 font-bold">{category?.categoryName}</span>
                                    <ul className="pl-1">
                                        {productDataFromStore?.map((product: IProduct) => <li>
                                            <Link to={`/products/${product?.productId}`} onClick={() => {setIsProductPageVisible(!isProductPageVisible)}}>
                                                {product.productCategory.categoryName === category.categoryName && product.productName}
                                            </Link>
                                        </li>)}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>}
                {/* <Link to={"#footer"}> */}
                {/* <Link to={"/about-us"} className="scroll-smooth text-sm capitalize transition-all duration-150 hover:bg-slate-500/10 flex justify-center items-center px-2 py-1 rounded-sm">
                    ABOUT
                </Link> */}
                {/* </Link> */}
                <Link to={"/blog"} className="text-sm capitalize transition-all duration-150 hover:bg-slate-500/10 flex justify-center items-center px-2 py-1 rounded-sm">
                    BLOG
                </Link>
                <Link className="text-sm capitalize transition-all duration-150 hover:bg-slate-500/10 flex justify-center items-center px-2 py-1 rounded-sm" to={"/contact"}>
                    CONTACT
                </Link>
            </div>
            <div className="sm:hidden block">
                <Hamburger toggled={isHamburgerMenuOpen} size={24} onToggle={() => {
                    // e.preventDefault();
                    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
                }}/>
                <Menu className="bg-cyan-300" onClose={() => {
                    setIsHamburgerMenuOpen(false);
                }} width={"160px"} customBurgerIcon={false} customCrossIcon={false} isOpen={isHamburgerMenuOpen}>
                    <div className="w-full h-full p-4 gap-4">
                        <Link onClick={() => {
                            setIsHamburgerMenuOpen(false);
                        }} className="text-sm capitalize transition-all duration-150 px-2 py-1 rounded-sm" to={"/"}>
                            <div className="items-center gap-4 font-bold text-sm flex">
                                <HomeIcon />
                                {/* <span className="bg-purple-600"> */}
                                    HOME
                                {/* </span> */}
                            </div>
                        </Link>
                        <Link onClick={() => {
                            setIsHamburgerMenuOpen(false);
                        }} className="text-sm capitalize transition-all duration-150 px-2 py-1 rounded-sm" to={"/products"}>
                            <div className="items-center gap-4 font-bold text-sm flex">
                                <Store />
                                {/* <span className="bg-purple-600"> */}
                                    PRODUCTS
                                {/* </span> */}
                            </div>
                        </Link>
                        <a href="#footer" className="text-sm capitalize transition-all duration-150 px-2 py-1 rounded-sm">
                            <div className="items-center gap-4 font-bold text-sm flex">
                                <CircleHelp />
                                {/* <span className="bg-purple-600"> */}
                                    ABOUT
                                {/* </span> */}
                            </div>
                        </a>
                        <Link onClick={() => {
                            setIsHamburgerMenuOpen(false);
                        }} className="text-sm capitalize transition-all duration-150 px-2 py-1 rounded-sm" to={"/contact"}>
                            <div className="items-center gap-4 font-bold text-sm flex">
                                <Headset />
                                {/* <span className="bg-purple-600"> */}
                                    CONTACT
                                {/* </span> */}
                            </div>
                        </Link>
                    </div>
                </Menu>
            </div>
            {/* <Link className="m-auto bg-blue-600 items-end flex-1 sm:flex-none flex justify-end" to={"/"}> */}
            <Link className="" to={"/"}>
                <img className="h-20" src="/logo.svg" />
            </Link>
            <div className="justify-between gap-4 items-center flex flex-1">
                {/* <div className="relative w-[60%] ml-16 hidden lg:block self-end justify-self-end bg-blue-500">
                    <Input placeholder={"search"} className="pl-8" />
                    <LucideSearch className="absolute top-[50%] w-4 h-4 translate-y-[-50%] left-2" />
                </div> */}
                <div className="flex-1 flex justify-end mr-4 gap-4 items-center">
                    <Link to={"/wishlist"} onClick={() => {
                        {console.log(customerData)}
                    }} className="transition-all z-[0] hover:scale-125 duration-250 hover:fill-red-500 relative">
                        {(currentWishlist?.length == 0 || currentWishlist == undefined) ?  <HeartCrack className="transition-all"/> : <LucideHeart className="fill-red-500 stroke-red-500 transition-all"/>}
                        <Badge className="absolute z-0 right-[-25%] top-[-25%] text-[10px] rounded-full px-1 py-0" variant={"secondary"}>{currentWishlist?.length}</Badge>
                    </Link>
                    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
                        <PopoverTrigger asChild>
                            {/* <Button className="w-10 h-10 rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            </Button> */}
                            <Button variant={"ghost"} id="account-btn" className="flex w-8 h-8 z-[0] justify-center items-center p-0 rounded-full">
                                {( customerData == null || customerData?.role == "Guest" ) ? <UserCircle2 className="w-full h-full"/> : <Avatar sx={{width: "100%", height: "100%", fontFamily: "quicksand", fontSize: "16px"}}>{customerData?.firstName!?.charAt(0)}</Avatar>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-4 z-[110]" side="bottom" sideOffset={12}>
                            {/* <Button variant={"ghost"} disabled={( customerData == null || customerData?._id == null)} className="w-full flex justify-start gap-4" onClick={() => {
                                navigate("/account-details")
                                setIsPopOverOpen(false);
                            }}>
                                <span>
                                    <Settings className="w-[20px]"/>
                                </span>
                                <p className="font-[Quicksand]">Account settings</p>
                            </Button> */}
                            <Button disabled={isLogoutButtonLoading} onClick={(e: any) => {
                                e.preventDefault();
                                if ( customerData == null || customerData?.role == "Guest" || !customerData?._id ) {
                                    gsap.to("#auth-component", {
                                        backdropFilter: 'blur(5px)',
                                        display: "flex",
                                        duration: 1
                                    });
                                    gsap.to("#auth-component", {
                                        opacity: 100,
                                        duration: 1
                                    });
                                    // navigate("/login")
                                } else {
                                    handleLogOut();
                                }
                                setIsPopOverOpen(false);
                            }} variant={"ghost"} className="w-full flex justify-start gap-4">
                                <span>
                                {!isLogoutButtonLoading ? (customerData == null || customerData?.role == "Guest" || !customerData?._id) ? <LogOut className="w-5" /> : <LogIn className="w-5" /> : <LoaderCircle className="animate-spin"/>}
                                </span>
                                <p className="font-[Quicksand]">{(customerData == null || customerData?.role == "Guest" || !customerData?._id) ? "Log in" : "Log out"}</p>
                            </Button>
                        </PopoverContent>
                    </Popover>
                    <Link to={"/cart"} className="flex gap-4 items-center justify-center relative">
                        <Button className="flex gap-4 items-center justify-center relative">
                            <ShoppingCart />
                            <span className="sm:block hidden">Cart</span>
                            <Badge className="absolute right-[-8%] top-[-18%] rounded-full px-1 py-0" variant={"secondary"}>{currentCart?.length}</Badge>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};