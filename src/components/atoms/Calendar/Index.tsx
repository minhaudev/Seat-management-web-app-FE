import { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "./style.css";

interface Props {
    minDate?: string;
    maxDate?: string;
    selectsRange?: boolean;
    startDate?: Date | null;
    selectedDate?: Date | null;
    endDate?: Date | null;
    formatDate?: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy/MM/dd";
    isShowIcon?: boolean;
    isShowIconRight?: boolean;
    onChange?: (dates: [Date | null, Date | null]) => void;
}

const parseDate = (
    dateString: string,
    format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy/MM/dd"
): Date => {
    let year, month, day;
    if (format === "dd/MM/yyyy") {
        [day, month, year] = dateString.split("/");
    } else if (format === "MM/dd/yyyy") {
        [month, day, year] = dateString.split("/");
    } else if (format === "yyyy/MM/dd") {
        [year, month, day] = dateString.split("/");
    }
    return new Date(`${year}-${month}-${day}`);
};

export default function Calendar(props: Props) {
    const {
        selectedDate,
        minDate,
        maxDate,
        isShowIcon,
        formatDate,
        isShowIconRight,
        startDate,
        endDate,
        onChange,
        selectsRange = false
    } = props;

    const customLocale = {
        ...enGB,
        localize: {
            ...enGB.localize,
            day: (n: any) =>
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][n]
        },
        options: {
            weekStartsOn: 0
        }
    };

    registerLocale("custom", customLocale as any);

    const parsedMinDate =
        minDate && formatDate ? parseDate(minDate, formatDate) : undefined;
    const parsedMaxDate =
        maxDate && formatDate ? parseDate(maxDate, formatDate) : undefined;

    return (
        <div
            className={`${isShowIconRight ? "icon-right" : "icon-left"} w-full`}>
            <DatePicker
                minDate={parsedMinDate}
                maxDate={parsedMaxDate}
                selected={selectedDate ?? null}
                showIcon={isShowIcon}
                onChange={onChange}
                startDate={startDate ?? undefined}
                endDate={endDate ?? undefined}
                selectsRange={selectsRange as true}
                dateFormat={formatDate}
                locale="custom"
                renderDayContents={(day, date) => (
                    <div className="react-datepicker__inside-day">{day}</div>
                )}
            />
        </div>
    );
}
