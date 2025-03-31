import React from "react";
import TriagleExClamation from "@/assets/svgs/triangle_exclamation.svg";

interface PropertieProps {
    title: string;
}

const PropertyPending = ({ title }: PropertieProps) => {
    title = title.toUpperCase()
    return (
        <div
            className={`py-1 px-4  w-[193px]  text-text  text-center text-[11px] font-medium rounded-sm max-w-md bg-gray-light `}>
            <p className="text-center">{title}</p>
        </div>
    );
};

export default PropertyPending;
