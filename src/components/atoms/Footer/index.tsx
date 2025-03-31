import React, {ReactNode} from "react";

interface Props {
    children?: ReactNode;
}

export default function Footer(props: Props) {
    return (
        <div className="  w-full h-full max-h-[72px] bg-white text-white px-[16px] py-[18px]">
            {props.children}
        </div>
    );
}
