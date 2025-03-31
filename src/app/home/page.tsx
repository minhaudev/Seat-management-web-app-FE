import LayoutContainer from "@/app/LayoutContainer";

import React from "react";

import {twMerge} from "tailwind-merge";

const Home = () => {
    const tableClasses = twMerge(
        "min-h-[56px] flex justify-center items-center border-stroke border-b border-l"
    );
    const thClasses = twMerge(
        tableClasses,
        "border-t text-[12px] font-semibold"
    );
    const tdClasses = twMerge(
        tableClasses,
        "text-text text-[13px] font-normal"
    );

    return (
 
           <div className="w-full h-[650px]">
      
           </div>
       
    );
};

export default Home;
