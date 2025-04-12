import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { createTheme, IconButton, TextField, ThemeProvider } from "@mui/material";
import { Button } from "../../ui/button";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";

export const loginFormSchema = z.object({
    email: z.string().email("Invalid email, enter a valid email address!"),
    password: z.string().min(8, { message: "Password must be 8 characters long"}).refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lower case character!"}).refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one upper case character!"}).refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), { message: "Password must contain at least one special character!"}).refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one numberic value!"})
});

const textFieldTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root" : {
                        color: `${yellow[600]}`,
                    },
                    "& .MuiInputLabel-root" : {
                        // color: `${yellow[300]}`
                    },
                    "& .MuiInputLabel-root.Mui-focused" : {
                        color: `${yellow[600]}`
                    },
                    "& .MuiOutlinedInput-root" : {
                        "& filedset" : {
                            borderColor: `${"purple"}`
                        },
                        '&:hover fieldset': {
                            borderColor: `${yellow[500]}`,
                          },
                        '&.Mui-focused fieldset': {
                            borderColor: `${yellow[600]}`,
                        },
                        '& .MuiOutlinedInput-input': {
                            color: `${yellow[600]}`, 
                        },
                    },
                },
            }
        }
    }
})

export const AuthenticationComponent = ({ type } : { type: string }) => {
    
    // const userData = useSelector((state: any) => state.userData);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        (async function verify() {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/current-user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                console.log(response);
    
                if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
    
                const data = await response.json(); 
                
                console.log(data.data.role);
                
                if ( type === "dashboard") {
                    if ( data.data?.role !== "Admin"){
                        throw new Error("Unauthorized user!");
                    }
                    dispatch(setUser(data.data));
                    return navigate("/admin/dashboard/home"); 
                }
                if ( type == "home" ) {
                    if ( data.data?.role !== "Admin"){
                        throw new Error("Admins can only access the dashboard!");
                    }
                    dispatch(setUser(data.data));
                    return navigate("/");
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        })();        
    }, []);

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    

    const [ isLoginButtonLoading, setIsLoginButtonLoading ] = useState(false);

    const onLoginFormSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        console.log(values);
        setIsLoginButtonLoading(true);
        try {
            // @ts-ignore
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({email: values.email, password: values.password})
            });

            if (!response.ok) {
                const errData = await response.json();
                loginForm.setError(errData.errors[0].type, {type: "manual", message: errData.errors[0].errMsg})
                throw new Error("HTTP error! status: "+response.status);
            }

            console.log(response);
            
            const data = await response.json();

            if ( data.data.user.role !== "Admin" ) {
                loginForm.setError("email", { type: "manual", message: "Unauthorized user!"})
                throw new Error("Unauthorized user");
            }
            
            dispatch(setUser(data.data.user));
            navigate("/admin/dashboard/home");
            
            console.log(data);
        } catch (error) {
            console.error("Error: ", error);
        }
        setIsLoginButtonLoading(false);
    };

    const [ showPassword, setShowPassword ] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };

    return (
        <div className={cn(`w-full font-[quicksand] flex justify-center items-center`, (type === "dashboard") && "h-screen")}>
            <div className="rounded-lg gap-4 flex flex-col justify-center items-center shadow-lg bg-gray-100 text-center w-[400px] p-[5%]">
                <img src={"/logo.svg"} className="w-[80px]"/>
                <h1>Login to start your work!</h1>
                <div className="w-full" >
                    <Form {...loginForm}>
                        <form className="w-full flex flex-col gap-4 justify-center items-center" onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}>
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => {
                                    return <FormItem className="flex w-full justify-center gap-4 items-center flex-col">
                                        {/* <FormLabel>Username</FormLabel> */}
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
                            <Button disabled={isLoginButtonLoading} className="mt-4 w-16 bg-yellow-100 text-yellow-300 hover:text-yellow-500 hover:bg-yellow-300" variant={"ghost"} type="submit">{isLoginButtonLoading ? <Loader2 className="animate-spin" /> : "Login"}</Button> 
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};