"use client";
function TimeValidate({
    totalTime,
    currentTime,
    currentPercent,
    width = "40px",
    height = "40px",
    disableColor = "#E4E4E4"
}: {
    totalTime: number;
    currentTime: number;
    disableColor?: string;
    currentPercent: number;
    width?: string;
    height?: string;
}) {
    const currentTimeHour = currentTime / 3600;
    const color =
        currentTimeHour >= 5 ? "#69AA43"
        : currentTimeHour >= 3 && currentTimeHour < 5 ? "#F5BF00"
        : "#ED1E24";
    return (
        <div>
            <svg
                width={width}
                height={height}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 0C24.0092 4.78087e-08 27.9258 1.20491 31.2417 3.45839L28.4313 7.59379C25.9443 5.90368 23.0069 5 20 5V0Z"
                    fill={`${currentPercent > 0 ? color : disableColor}`}
                />
                <path
                    d="M31.7577 3.82108C35.0008 6.17799 37.4608 9.45521 38.8184 13.2275L34.1138 14.9206C33.0956 12.0914 31.2506 9.6335 28.8182 7.86581L31.7577 3.82108Z"
                    fill={`${currentPercent > 10 ? color : disableColor}`}
                />
                <path
                    d="M38.9918 13.73C40.2486 17.537 40.3323 21.634 39.232 25.4892L34.424 24.1169C35.2492 21.2255 35.1865 18.1528 34.2438 15.2975L38.9918 13.73Z"
                    fill={`${currentPercent > 20 ? color : disableColor}`}
                />
                <path
                    d="M39.0571 26.0685C37.8406 29.8886 35.5041 33.255 32.3508 35.7308L29.2631 31.7981C31.6281 29.9412 33.3805 27.4165 34.2928 24.5514L39.0571 26.0685Z"
                    fill={`${currentPercent > 30 ? color : disableColor}`}
                />
                <path
                    d="M31.8549 36.1078C28.6259 38.4842 24.7573 39.8354 20.751 39.9859L20.5632 34.9894C23.568 34.8765 26.4694 33.8632 28.8911 32.0809L31.8549 36.1078Z"
                    fill={`${currentPercent > 40 ? color : disableColor}`}
                />
                <path
                    d="M20 40C15.9908 40 12.0742 38.7951 8.75833 36.5416L11.5688 32.4062C14.0557 34.0963 16.9931 35 20 35V40Z"
                    fill={`${currentPercent > 50 ? color : disableColor}`}
                />
                <path
                    d="M8.34916 36.256C5.09052 33.9205 2.609 30.6596 1.22658 26.8963L5.91994 25.1722C6.95675 27.9947 8.81789 30.4404 11.2619 32.192L8.34916 36.256Z"
                    fill={`${currentPercent > 60 ? color : disableColor}`}
                />
                <path
                    d="M1.02053 26.3071C-0.24378 22.5025 -0.335482 18.4058 0.757323 14.5485L5.56799 15.9113C4.74839 18.8043 4.81716 21.8769 5.7654 24.7303L1.02053 26.3071Z"
                    fill={`${currentPercent > 70 ? color : disableColor}`}
                />
                <path
                    d="M0.927817 13.979C2.13476 10.1559 4.46287 6.78369 7.61004 4.30003L10.7075 8.22502C8.34715 10.0878 6.60107 12.6169 5.69586 15.4843L0.927817 13.979Z"
                    fill={`${currentPercent > 80 ? color : disableColor}`}
                />
                <path
                    d="M8.13285 3.90122C11.36 1.52235 15.2276 0.168278 19.2338 0.0146828L19.4253 5.01101C16.4207 5.12621 13.52 6.14177 11.0996 7.92591L8.13285 3.90122Z"
                    fill={`${currentPercent > 90 ? color : disableColor}`}
                />
            </svg>
        </div>
    );
}

export default TimeValidate;
