import useValidateTime from "@/hooks/useValidateTime";
import FormatTime from "../../atoms/FormatTime";
import TimeValidate from "../../atoms/TimeValidate";
import { useEffect } from "react";

function ValidateServiceTime({
    endDate,
    startDate,
    onEnd
}: {
    endDate: Date;
    startDate: Date;
    onEnd?: () => void;
}) {
    const {
        timeAble,
        totalTimeHours,
        timeValidity,
        currentPercent,
        end,
        setEnd
    } = useValidateTime({ endDate, startDate, onEnd });
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (end && onEnd && timeAble >= 0) {
                alert("end in ");
                setEnd(false);
            }
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [end, onEnd, setEnd, timeAble]);
    return (
        <div className="flex items-center gap-2 text-[11px] font-[500] text-center font-sf-ui-display text-text">
            <TimeValidate
                currentPercent={currentPercent}
                currentTime={timeAble}
                totalTime={totalTimeHours}
            />
            <FormatTime date={timeValidity} />
        </div>
    );
}

export default ValidateServiceTime;
