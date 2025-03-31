export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function calculateDate({
    startDate,
    endDate,
    isTotal = false,
    isTimeUse = false,
    hasDay = true,
}: {
    startDate: Date;
    endDate: Date;
    isTotal?: boolean;
    isTimeUse?: boolean;
    hasDay?: boolean;
}) {
    if (isNaN(endDate.getTime()) ||
        isNaN(startDate.getTime())) {

        return { day: 0, hours: 0, minutes: 0, secondTime: 0 };
    }
    let milliSecondTimeAble = 0

    if (convertToTimeStamp(startDate) > convertToTimeStamp(new Date(Date.now())) || isTotal || isTimeUse) {
        milliSecondTimeAble =
            convertToTimeStamp(endDate) - convertToTimeStamp(startDate);
    } else {
        milliSecondTimeAble = convertToTimeStamp(endDate) - convertToTimeStamp(new Date(Date.now()))
    }
    const timeAble = milliSecondTimeAble / (1000 * 60 * 60);
    const day = Math.floor(timeAble / 24);
    let hours = Math.floor(timeAble) - day * 24;
    const minutes =
        Math.floor(milliSecondTimeAble / (1000 * 60)) -
        (hours * 60 + day * 24 * 60);
    const secondTime = Math.floor(
        milliSecondTimeAble / 1000 -
        (minutes * 60 + hours * 60 * 60 + day * 24 * 60 * 60)
    );
    if (!hasDay) {
        hours = day * 24 + hours
        return { day: 0, hours, minutes, secondTime };
    }
    return { day, hours, minutes, secondTime };
}

export const convertToTimeStamp = (date: Date) => {
    const timeZone = new Date().getTimezoneOffset() / 60;
    return date.getTime() + timeZone * 60 * 60 * 1000;
};

export const FormatTime = (time: number) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};
export const FormatTimeHours = (time: number) => {
    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};

export function timeToTimestamp(time: string) {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    // Get the current date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // Create a new date with the current date and the specified time
    const dateWithTime = new Date(year, month, day, hours, minutes, seconds);

    return dateWithTime.getTime();
}
