// import React, { useState, useEffect } from "react";
// import TimeFill from "@/assets/svgs/time_fill.svg";
// import HouseGlass from "@/assets/svgs/hour_glass.svg";
// import { StatusTimeEnum } from "@/enums/StatusTimeEnum";
// // import useValidateTime from "@/hooks/useValidateTime";
// import FormatTime from "../FormatTime";
// import { convertToTimeStamp } from "@/utils";

// interface ServiceTimeProps {
//     endDate: Date;
//     startDate: Date;
//     isValidity: boolean;
//     onEnd?: () => void;
// }

// interface ServiceTimeValue {
//     color: string;
//     icon: React.ReactNode;
//     background: string;
//     background2?: string;
// }

// const ServiceTimeValue: Record<StatusTimeEnum, ServiceTimeValue> = {
//     [StatusTimeEnum.Success]: {
//         color: "text-green",
//         icon: <TimeFill className="mr-1 text-green" />,
//         background: "bg-green-light",
//         background2: "bg-green"
//     },
//     [StatusTimeEnum.Warning]: {
//         color: "text-yellow",
//         icon: <TimeFill className="mr-1 text-yellow" />,
//         background: "bg-yellow-light",
//         background2: "bg-yellow"

//     },
//     [StatusTimeEnum.Error]: {
//         color: "text-red",
//         icon: <TimeFill className="mr-1 text-red" />,
//         background: "bg-red-light",
//         background2: "bg-red"

//     }
// };

// const ServiceTime: React.FC<ServiceTimeProps> = ({
//     endDate,
//     startDate,
//     isValidity,
//     onEnd
// }) => {
//     const [typeTime, setTypeTime] = useState(StatusTimeEnum.Success);
//     const {
//         timeValidity,
//         currentPercent,
//         totalTimeHours,
//         totalTime,
//         setEnd,
//         end,
//         timeUsed
//     } = useValidateTime({ endDate, startDate, onEnd });

//     const { color, icon, background, background2 } = ServiceTimeValue[typeTime];
//     const validityTime = {
//         ...timeValidity,
//         hours: timeValidity.day * 24 + timeValidity.hours,
//         day: 0
//     };
//     const timeTo = {
//         ...totalTime,
//         hours: totalTime.day * 24 + totalTime.hours,
//         day: 0
//     };

//     const timeAble = Math.floor(
//         (convertToTimeStamp(endDate) - convertToTimeStamp(new Date(Date.now()))) / 1000);
//     if (timeAble <= 0) {
//         timeTo.hours = 0;
//         timeTo.minutes = 0;
//         timeTo.secondTime = 0;
//     }
//     useEffect(() => {
//         const hoursRemaining = validityTime.hours;
//         if (hoursRemaining < 2) {
//             setTypeTime(StatusTimeEnum.Error);
//         } else if (hoursRemaining < 5) {
//             setTypeTime(StatusTimeEnum.Warning);
//         } else {
//             setTypeTime(StatusTimeEnum.Success);
//         }
//     }, [validityTime.hours, timeUsed.hours]);
//     return (
//         <div
//             className={`px-2 py-1 flex flex-row ${background} items-center rounded-[3px]  gap-x-1 m-0`}>
//             {isValidity ? (
//                 <>
//                     <TimeFill className={color} />
//                     <div className="text-gray text-xs font-normal font-sf-ui-display flex flex-row text-[12px] justify-center ">
//                         Service time:
//                         <span className={`color flex flex-row justify-center`}>
//                             <FormatTime date={timeUsed} textColor={color} background={background2} />
//                             <span className={`${color}`}> / </span>
//                             <FormatTime date={timeTo} textColor={color} background={background2} />
//                         </span>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <HouseGlass className={color} />
//                     <div className="text-gray text-xs font-normal font-sf-ui-display flex flex-row text-[12px] justify-center ">
//                         Validity time:
//                         <span className={color}>
//                             <FormatTime date={validityTime} textColor={color} background={background2} />
//                         </span>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ServiceTime;
