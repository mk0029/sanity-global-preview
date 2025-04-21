"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Icons from "./Icons";


const NavBar = () => {
    const NAV_LINK_LIST = [
        {
            link: "How We Help ",
            url: "/"
        },
        {
            link: "Who We Help ",
            url: "/"
        },
        {
            link: "Why Venveo ",
            url: "/"
        },
        {
            link: "Resources",
            url: "/"
        },
    ]


    const [show, setShow] = useState(true);
    function showNav() {
        setShow(!show);
        if (show === true) {
            document.body.classList.add("max-lg:!overflow-hidden");
        } else {
            document.body.classList.remove("max-lg:!overflow-hidden");
        }
    }
    return (
            <div className="">
                <div className="flex justify-between ">
                    <a href="" className="lg:ps-[57px] ps-5 ">
                        <Image
                            src="/assets/images/svg/venveo-logo.svg"
                            alt="nav-logo"
                            height={90}
                            width={59}
                            className=""
                        />
                    </a>
                    <ul
                        className={`w-full justify-end ff_maison flex items-center gap-4 xl:gap-6 max-lg:z-10 max-lg:justify-center max-lg:flex-col max-lg:fixed max-lg:right-0 max-lg:top-0 max-lg:bg-white max-lg:w-full max-lg:h-screen duration-300 ${show ? "max-lg:translate-x-full" : "max-lg:translate-x-0"
                            }`}
                    >
                        {NAV_LINK_LIST.map((data, index) => (
                            <li key={index}>
                                <Link
                                    onClick={showNav}
                                    href={data.url}
                                    className="text-black hover:text-opacity-100 !leading-[100%] text-opacity-90 font-medium text-base duration-300 relative after:absolute after:w-0 after:h-0.5 after:rounded-full after:-bottom-2 after:start-1/2 after:-translate-x-1/2 after:bg-black hover:after:w-[100%] after:duration-300"
                                >
                                    {data.link}
                                </Link>
                            </li>
                        ))}
                        <li className="">
                            <button
                                aria-label="contact us"
                                className="w-full sm:flex gap-1 hover:bg-black hover:text-white transition-all ease-linear duration-300 group max-sm:hidden py-8 px-5 max-w-[154px] text-deep-blue  bg-[#D2F038] flex font-bold text-base items-center text-nowrap leading-[100%]"
                            >
                                Let’s Talk
                                <span>
                                    <Icons icon="rightArrow" />
                                </span>
                            </button>
                        </li>
                    </ul>
                    <div className="flex gap-4 items-center">
                        {/* <button
                            aria-label="contact us"
                            className="w-full sm:flex gap-1 hover:bg-black hover:text-white transition-all ease-linear duration-300 group max-sm:hidden py-8 px-5 max-w-[154px] text-deep-blue  bg-[#D2F038] flex font-bold text-base items-center text-nowrap leading-[100%]"
                        >
                            Let’s Talk
                            <span>
                                <Icons icon="rightArrow" />
                            </span>
                        </button> */}
                        <div
                            className="lg:hidden cursor-pointer pointer-events-auto"
                            onClick={showNav}
                        >
                            {show ? (
                                <div className="z-30 cursor-pointer relative">
                                    <Icons icon="menuIcon" />
                                </div>
                            ) : (
                                <div className="z-20 cursor-pointer relative">
                                    <Icons icon="crossIcon" />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
    );
};
export default NavBar;