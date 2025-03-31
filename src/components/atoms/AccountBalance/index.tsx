interface AccountItem {
    title: string;
    value: number;
    percentage: number;
    count: number;
}
interface Props {
    dataList: AccountItem[];
}
export default function AccountBalance(props: Props) {
    const {dataList} = props;
    return (
        <div className="w-[100%] h-full bg-white py-[32px] px-[24px] ">
            <div className="flex justify-between">
                <p className="text-[16px] text-text leading-[19.09px] font-medium">
                    Customer account balance
                </p>
                <p className="font-medium text-[12px] leading-[14.32px] text-primary">
                    Eligible for new enquiries
                </p>
            </div>
            <div>
                <div className="w-[100%]">
                    <div className="text-input flex mb-2 justify-between font-medium text-[12px] leading-[14.32px]">
                        <div className="w-[25%]"></div>
                        <div className="w-[25%]">Total (VND)</div>
                        <div className="w-[20%]">Percentage</div>
                        <div className="w-[30%] text-end">
                            Average invoicing aging (days)
                        </div>
                    </div>
                </div>
                {dataList.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full ${index !== dataList.length - 1 ? "border-b border-stroke" : ""}`}>
                        <div className="flex w-full justify-end items-end mt-[7px] mb-[7px] text-[#4B5563] text-[11px] font-medium leading-[13.13px]">
                            <p className="w-[25%] ">{item.title}</p>
                            <p className="w-[25%] ">
                                {new Intl.NumberFormat().format(item.value)}
                            </p>
                            <p className="w-[25%] pl-8">
                                {item.percentage !== 0 ?
                                    `${item.percentage}%`
                                :   "--"}
                            </p>
                            <p className="w-[25%] text-end ">
                                {new Intl.NumberFormat().format(item.count)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
