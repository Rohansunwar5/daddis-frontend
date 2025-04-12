import { useEffect } from "react";
import { MainLayout } from "./components/home/MainLayout";
import "./styles/index.css";
import { useDispatch } from "react-redux";
import { setPartnerBanners, setCategories, setProductData, setTopProducts, setCustomerData, setHeroBanners } from "./redux/slices/websiteSlice";
import { toast } from "sonner";
import { ToastWarning } from "./components/dashboard/productMain/AllProductsTable";

export const App = () => {

    const dispatch = useDispatch();

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

              if (!response.ok) {
                if ( response.statusText == "Unauthorized" || response.status == 401 ) {
                  // console.log(await createGuestUser());
                }
                throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
              }
              const data = await response.json();

              console.log(data);

              // if (data.data.role !== "Customer") throw new Error(`Error: ${401}, Unauthorised user`);
              dispatch(setCustomerData(data.data));
          } catch (error) {
              console.error("Error: ", error);
              // console.log(userData);
              if(!(localStorage.getItem("cart")))
                localStorage.setItem("cart", JSON.stringify([]));
              if(!(localStorage.getItem("wishList")))
                localStorage.setItem("wishList", JSON.stringify([]));
          }
        })();
        (async function() {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}products/get-all-products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                // console.log(response);

                if (!response.ok) throw new Error("HTTP error! status: "+response.status+", "+response.statusText);
                
                const data = await response.json();
                dispatch(setProductData(data.data));
                console.log(data.data);
                
            } catch (error) {
                console.log(error);
            }
        })();
        (async function () {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}categories/get-all-categories`);
            
                const data = await response.json();
            
                if ( !response.ok )
                  throw new Error("Error : "+ response);
            
                console.log(data.data);
                // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
                dispatch(setCategories(data.data));

              } catch (error) {
                console.log(error);
                toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
              }
        })();
        // console.log(`state: ${useSelector((state: any) => state)}`);
        (async function () {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}banners/get-all-banners-from-a-type/partner-banner`);
            
                const data = await response.json();
            
                if ( !response.ok )
                  throw new Error("Error : "+ response);

                dispatch(setPartnerBanners(data.data));
                console.log(data.data);
                // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
              } catch (error) {
                console.log(error);
                toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
              }
        })();
        (async function () {
            try {
                // @ts-ignore
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}banners/get-all-banners-from-a-type/hero-section-banner`);
            
                const data = await response.json();
            
                if ( !response.ok )
                  throw new Error("Error : "+ response);

                console.log(data.data);
                dispatch(setHeroBanners(data.data));
                // toast.success("Categories fetched successfully!", { className: "font-[quicksand]", icon: <ToastSuccess />})
              } catch (error) {
                console.log(error);
                toast.error("Failed to fetch categories!", { className: "font-[quicksand]", icon: <ToastWarning /> });
              }
        })();
        (function () {
          dispatch(setTopProducts([
            {
              productName: "Gogeta super saiyan 4 poster",
              imageUrl: [{ url: "https://pbs.twimg.com/media/GSGpOAEXQAAU_eK?format=jpg&name=4096x4096"}],
              price: 195,
              weight: {
                number: 200,
                unit: "g"
              },
            },
            {
              productName: "Vegito blue poster",
              imageUrl: [{ url: "https://4kwallpapers.com/images/walls/thumbs_3t/17072.jpeg"}],
              price: 80,
              weight: {
                number: 180,
                unit: "g"
              },
            },
            {
              productName: "UI Goku poster",
              imageUrl: [{ url: "https://wallpapercave.com/wp/wp2437261.jpg"}],
              price: 85,
              weight: {
                number: 180,
                unit: "g"
              },
            },
          ]));
        })();
    }, []);

    return (
        <MainLayout />
    );
};