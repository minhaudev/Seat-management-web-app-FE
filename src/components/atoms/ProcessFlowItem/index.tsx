import { ProcessFlowProps, stateProcess } from "@/interfaces";
import IconProcess from "./IconProcess";
import {styleProcessItem} from "@/consts";
function ProcessFlowItem({
    id = 1,
    label = "",
    icon: IconComponent,
    line = false,
    state = stateProcess.ACTIVE,
    onChangeState = () => {}
}: ProcessFlowProps) {
    const styleProcessItems = styleProcessItem(state);
    return (
        <div className="flex flex-col items-center min-w-[113px] max-w-[133px]">
            <div className={`flex justify-start items-center`}>
                <div>
                    <IconProcess
                        icon={IconComponent}
                        id={id}
                        line={line}
                        state={state}
                        onChangeState={(id) => onChangeState(id)}>
                        <p
                            className={`text-[12px] select-none pointer-events-none font-[500] font-sf-ui-display ${styleProcessItems.text} leading-[14.32px] mt-2`}>
                            {label}
                        </p>
                    </IconProcess>
                </div>
            </div>
        </div>
    );
}

export default ProcessFlowItem;
