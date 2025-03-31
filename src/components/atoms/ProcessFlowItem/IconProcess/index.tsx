import DonIcon from "@/assets/svgs/done_process.svg";
import {styleProcessItem} from "@/consts";
import {stateProcess} from "@/interfaces";
import {ReactNode} from "react";
interface IconProcessProp {
    id: number;
    icon: any;
    line: boolean;
    state: stateProcess;
    onChangeState: (id: number) => void;
    col?: boolean;
    children?: ReactNode;
}
function IconProcess({
    id = 1,
    icon: IconComponent,
    line = false,
    col = true,
    state = stateProcess.ACTIVE,
    onChangeState = () => {},
    children
}: IconProcessProp) {
    const styleProcessItems = styleProcessItem(state);
    return (
        <div
            className={`flex flex-col ${!col && "!flex-row-reverse gap-[11px]"} items-center`}>
            <div className={`relative`}>
                {state !== stateProcess.DONE ?
                    <div
                        onClick={() => {
                            if (state === stateProcess.PENDING) {
                                return onChangeState(id);
                            }
                        }}
                        className={`rounded-full  ${stateProcess.NONE === state ? "disabled cursor-not-allowed" : "cursor-pointer"} w-[48px] h-[48px] p-1 flex items-center justify-center border-[0.5px] ${
                            stateProcess.ACTIVE === state ?
                                "border-secondary"
                            :   "border-unit"
                        }`}>
                        <div
                            className={`w-full h-full  rounded-full  ${styleProcessItems.bg} 
          flex items-center justify-center
          `}>
                            <IconComponent
                                className={`
                min-w-[29px]
                min-h-[29px]
                ${stateProcess.ACTIVE === state ? "text-white" : "text-unit"}`}
                            />
                        </div>
                    </div>
                :   <DonIcon
                        onClick={(id: number) =>
                            onChangeState && onChangeState(id)
                        }
                        className="cursor-pointer min-w-[48px] min-h-[48px]   "
                    />
                }
                {line && col && (
                    <div className="h-[2px] w-[60px] bg-unit rounded-sm overflow-hidden absolute left-[56px] top-[50%] translate-y-[-50%]  ">
                        <div
                            className={`${styleProcessItems.w} ${state === stateProcess.ACTIVE ? "bg-secondary" : "bg-primary-5-hover"} rounded-sm  h-full`}></div>
                    </div>
                )}
            </div>
            {children && children}
        </div>
    );
}

export default IconProcess;
