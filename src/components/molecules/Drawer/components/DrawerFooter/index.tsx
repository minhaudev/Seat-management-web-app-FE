import Button from "@/components/atoms/Button";
import React, {ReactNode} from "react";
interface PropsFooter {
    title: string;
    isAction?: boolean;
    children?: ReactNode;
    handleClick: () => void;
}
export default function DrawerFooter(props: PropsFooter) {
    return (
        <div className="px-5 ">
            {props.children}
            {props.isAction && (
                <Button
                    className="w-full "
                    variant="primary-dark"
                    size="semi"
                    color="white"
                    onClick={props.handleClick}>
                    {props.title}
                </Button>
            )}
        </div>
    );
}
