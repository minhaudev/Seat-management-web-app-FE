import useValidateTime from "@/hooks/useValidateTime";
import FormatTime from "../../atoms/FormatTime";
import {useEffect} from "react";

function ValidateValidityTime({
    endDate,
    startDate,
    onEnd
}: {
    endDate: Date;
    startDate: Date;
    onEnd?: () => void;
}) {
    const {timeValidity, currentPercent, timeAble, end, setEnd} =
        useValidateTime({
            endDate,
            startDate
        });
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (end && onEnd && timeAble >= 0) {
                alert("end in ");
                setEnd(false);
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [end, onEnd, setEnd, timeAble]);
    const currentTimeHour = timeAble / 3600;
    const bgColor =
        currentTimeHour >= 5 ? "bg-green-bold"
        : currentTimeHour >= 3 && currentTimeHour < 5 ? "bg-yellow"
        : "bg-red";
    return (
        <div className=" text-[11px] font-[500]  font-sf-ui-display text-text">
            <div className="w-[90px] h-1 mb-2  overflow-hidden bg-stroke rounded-md  ">
                <div
                    className={`${bgColor} mb-[8px]  h-1 rounded-md`}
                    style={{width: `${currentPercent}%`}}></div>
            </div>
            <FormatTime date={timeValidity} />
        </div>
    );
}

export default ValidateValidityTime;
