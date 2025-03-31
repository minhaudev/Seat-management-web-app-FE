import React, {ReactNode} from "react";
interface propsContent {
    children: ReactNode;
}
export default function DrawerContent(props: propsContent) {
    return (
        <div className="px-6 pt-6 h-[80vh] overflow-auto">{props.children}</div>
    );
}
