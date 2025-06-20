import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { ToastFaliure } from "../dashboard/productMain/AllProductsTable";
import { ISampleBlogs } from "../../utils/constants";
import { useNavigate} from "react-router-dom";

const getBlogs = async () => {
    try {
        // @ts-ignore
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_PORT}${import.meta.env.VITE_API_URL}blogs/get-all-blogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
        });
    
        const data = await response.json();
        if ( !response.ok ){
          throw new Error("error" + response);
        }
        console.log(data.data);
        return data.data;
      } catch (error: any) {
        console.log(error);
        toast.error("Error while fetching blogs, please refresh!", { description: error, className: "bg-red-300 font-[quicksand]", icon: <ToastFaliure /> }, );
        return error;
    }
}

const Blog = ({ blog } : { blog : ISampleBlogs }) => {

    const navigate = useNavigate();

    return (
        <div className="w-[300px] bg-black/5 flex flex-col h-[450px] rounded-lg">
            <p className="px-[2%] py-[5%] text-center m-auto flex items-center">{blog.title}</p>
            <span id="blog-content" className="bg-black/30 relative flex-1 rounded-[inherit] rounded-t-none">
                <img src={blog?.blogImgUrl?.url} className="h-full object-cover rounded-[inherit] w-full" />
                <span className="absolute px-2 bg-black/60 text-white py-2 w-full bottom-0 rounded-b-[inherit] ">
                    {/* <p className="font-thin text-white/50">
                        {parse(blog?.blogContent?.markup)}
                    </p> */}
                    <Button variant={"ghost"} onClick={() => {
                        navigate(`/blog/${blog._id}`);
                    }} className="text-xs p-0 my-0 hover:bg-transparent h-0">VIEW BLOG</Button>
                </span>
            </span>
        </div>
    );
}

export const BlogPage = () => {

    const [ blogs, setBlogs ] = useState<Array<ISampleBlogs>>([]);
    const [ isLoadmoreButtonDisabled, setIsLoadmoreButtonDisabled ] = useState(false);
    const [visibleItemCount, setVisibleItemCount] = useState(5);
    const [displayedData, setDisplayedData] = useState(blogs?.slice(0, visibleItemCount));

    useEffect(() => {
        if ( displayedData.length === blogs.length ) {
            setIsLoadmoreButtonDisabled(true);
        } else {
            setIsLoadmoreButtonDisabled(false);
        }
    }, [displayedData]);

    useEffect(() => {
        (async () => {
            setBlogs(await getBlogs());
        })();
    }, []);

    return (
        <div className="px-[10%] mt-14">
            <div className="relative rounded-md">
                <img src="https://images8.alphacoders.com/132/1329177.png" className="w-full bg-black/30 rounded-[inherit] object-cover object-top h-[200px]" />
                <span className="font-[] bottom-10 left-[50%] text-white -translate-x-[50%] absolute text-4xl font-semibold"><i>Daadis's</i></span>
            </div>
            <p id="blog-page-desc" className="text-justify mt-14 px-[10%]">
                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains
            </p>
            <div className="justify-between flex-grow flex-wrap gap-x-4 gap-y-4 flex w-full min-h-[calc(100vh-50px)] my-14">
                {blogs?.map((blog: ISampleBlogs) => (
                    <Blog blog={blog} />
                ))}
                <div className="flex-col flex gap-4 mt-14 justify-center items-center w-full">
                    {(displayedData?.length === blogs?.length) && <p className="font-[quicksand]"><i>Thats all...</i></p>}
                    <Button disabled={isLoadmoreButtonDisabled} onClick={() => {
                            setVisibleItemCount(prevCount => prevCount + 5);
                            setDisplayedData(blogs?.slice(0, visibleItemCount + 5));
                    }} className={cn("flex justify-center items-center gap-2", (displayedData.length === blogs.length) && "")}>Load more {(displayedData.length === blogs.length) ? <X /> : <Plus />}</Button>
                </div>
            </div>
        </div>
    );
};