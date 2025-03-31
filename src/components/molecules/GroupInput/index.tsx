import React from "react";
interface Props {
    onChange?:
        | ((
              e: React.ChangeEvent<
                  HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
              >
          ) => void)
        | undefined;
    value1?: string;
    value2?: string;
    placeholder1?: string;
    placeholder2?: string;
    name1?: string;
    name2?: string;
    isDisable?: boolean;
}

import Input from "@/components/atoms/Input";
export default function GroupInput(props: Props) {
    return (
        <div className="border border-input w-full flex flex-col justify-center">
            <Input
                isDisabled={props.isDisable}
                isContentCenter
                className="!border-none !outline-none !w-full py-0 h-4"
                handleOnChange={props?.onChange}
                placeholder={props.placeholder1}
                value={props.value1}
                name={props.name1}
            />
            <Input
                isDisabled={props.isDisable}
                isContentCenter
                handleOnChange={props?.onChange}
                className="!border-none !outline-none !w-full py-0 h-4"
                placeholder={props.placeholder2}
                value={props.value2}
                name={props.name2}
            />
        </div>
    );
}
