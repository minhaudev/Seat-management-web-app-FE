import React from "react";

function FormatTime({ date, textColor, background }: { date: any, textColor?: string, background?: string }) {
    return (
        <>
            {date ?
                <div className={`flex items-center text-[11px] font-sf-ui-display font-[500] leading-[16px]  tracking-[0.5px] min-w-[56px] ${textColor ? textColor : "text-text"}`}>
                    {date.day > 0 && (
                        <p className="mr-[2px] min-w-4 max-w-4 flex justify-center items-center">
                            {date.day}D{" "}
                        </p>
                    )}
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        {date.hours >= 0 && date.hours < 10 ?
                            date.hours.toString().padStart(2, "0")
                            : `${date.hours}`}
                    </p>
                    <div className="flex flex-col gap-[2.5px] items-center justify-center min-w-[3px]">
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                    </div>
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        {" "}
                        {date.minutes >= 0 && date.minutes < 10 ?
                            date.minutes.toString().padStart(2, "0")
                            : date.minutes}
                    </p>
                    <div className="flex flex-col gap-[2.5px] items-center justify-center min-w-[3px]">
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                    </div>
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        {" "}
                        {date.secondTime >= 0 && date.secondTime < 10 ?
                            date.secondTime.toString().padStart(2, "0")
                            : date.secondTime}
                    </p>
                </div>
                : <div className="text-[11px] font-sf-ui-display font-[500] leading-[16px] text-text">
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        00
                    </p>{" "}
                    <div className="flex flex-col gap-[2.5px] items-center justify-center min-w-[3px]">
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                    </div>{" "}
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        00
                    </p>{" "}
                    <div className="flex flex-col gap-[2.5px] items-center justify-center min-w-[3px]">
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                        <div className={`w-[1.3px] h-[1.3px] rounded-full ${background ? background : "bg-[#000]"}`}></div>{" "}
                    </div>{" "}
                    <p className="min-w-4 max-w-4 flex justify-center items-center">
                        00
                    </p>
                </div>
            }
        </>
    );
}

export default FormatTime;
