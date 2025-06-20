import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div id="footer" className="py-8 mx-8 flex sm:flex-row flex-col border text-sm justify-center border-t-1 font-[quicksand] border-b-0 border-r-0 border-l-0 gap-4 border-stone-500/50">
            <div id="socials" className="pt-6 flex bottom-0 flex-1 justify-center items-center flex-col gap-6 h-20">
                <h4 className="text-sm">Daadi's</h4>
                <div className="flex justify-center items-center gap-4">
                    <Instagram className="stroke-1 hover:cursor-pointer hover:scale-105 transition-all duration-150" />
                    <Linkedin className="stroke-1 hover:cursor-pointer hover:scale-105 transition-all duration-150" />
                    <Youtube className="stroke-1 hover:cursor-pointer hover:scale-105 transition-all duration-150" />
                    <Facebook className="stroke-1 hover:cursor-pointer hover:scale-105 transition-all duration-150" />
                </div>
            </div>
            <div id="reach-us" className="flex-1">
                <p className="font-bold">Reach us</p>
                <p className="capitalize">meghraj food processing india pvt. ltd.</p>
                <div id="address">
                    <p className="">
                        Unit - 1<br />
                        Plot NO 48 NO-179
                        FIRST PHASE, Jigani Industrial Area
                        Anekal Taluk, Bengaluru-Urban
                        Jigani -562106
                        GSTIN- 29AAFCM7897R1Z3
                    </p>
                    <br />
                    <p>
                        Unit - 2<br />
                        Shed No :- 03, Plot No : 322-A
                        Opposite:- HDFC Bank,
                        Next to Indian Petrol Bunk,
                        Bommasandra-jigani link road,
                        KIADB Industrial Area, Jigani,
                        Anekal Taluk, Bengaluru Urban,
                        Karnataka. PIN-560105
                        GST- 29AAFCM7897R1Z3e
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-row">
                <div id="quick-links" className="flex flex-col flex-1 items-center">
                    <div className="flex flex-col">
                        <h2 className="font-bold">
                            Quick links
                        </h2>
                        <Link className="underline" to={"/terms-and-conditions"}>Terms & conditions</Link>
                        <Link className="underline" to={"/privacy-policy"}>Privacy policy</Link>
                        <Link className="underline" to={"/faq"}>FAQ</Link>
                    </div>
                </div>
                <div id="topic" className="flex flex-col items-center flex-1">
                    <div className="flex flex-col">
                        <h2 className="font-bold">
                            Topic
                        </h2>
                        <Link className="underline" to={"/about-us"}>about us</Link>
                        <Link className="underline" to={"/category/all"}>Products</Link>
                        <Link className="underline" to={"/contact"}>Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}