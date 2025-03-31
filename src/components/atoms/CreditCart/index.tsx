import React from "react";
// import cart_img from "@/assets/images/cart_img.png";

interface InfoCartItem {
    id?: string;
    name: string;
    orderType: string;
    ticketNumber: string;
    customer: string;
    createdDate: string;
    address: string;
}

interface Props {
    infoCartList: InfoCartItem;
}

export default function Index(props: Props) {
    const {infoCartList} = props;
    const {id, name, orderType, ticketNumber, createdDate, customer, address} =
        infoCartList;

    return (
        <div
        className={`before:content-[''] before:w-full before:h-full  before:absolute before:bg-[url('/images/cart_img.png')] before:bg-no-repeat before:bg-[left_top_20px] w-[100%] h-full relative rounded bg-custom-gradient-cart`}>
            <div className="px-[25px] py-6 z-10 relative">
                <div className="font-medium text-[16px] leading-[19.09px] text-white">
                    General information
                </div>
                <div className="flex gap-x-[15px] gap-y-[32px] w-full mt-6 z-10 text-white h-auto">
                    <div className="flex-col w-[31%]">
                        <p className="text-[12px] leading-[14.32px] font-normal mb-1">
                            Salesperson
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal break-words">
                            {name}
                        </p>
                    </div>
                    <div className="flex-col text-white w-[66%] break-words">
                        <p className="text-[12px] leading-[14.32px] mb-1 font-normal">
                            Order type
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal">
                            {orderType}
                        </p>
                    </div>
                </div>
                <div className="flex gap-x-[10px] gap-y-[32px] w-full mt-6 text-white h-auto">
                    <div className="flex-col w-[31%] font-normal">
                        <p className="text-[12px] leading-[14.32px] mb-1 font-normal">
                            Ticket number
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal break-words">
                            {ticketNumber}
                        </p>
                    </div>
                    <div className="flex-col text-white w-[66%] break-words">
                        <p className="text-[12px] leading-[14.32px] font-normal mb-1">
                            Customer
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal">
                            {customer}
                        </p>
                    </div>
                </div>
                <div className="flex gap-x-[10px] gap-y-[32px] w-full mt-6 text-white h-auto">
                    <div className="flex-col w-[31%]">
                        <p className="text-[12px] font-normal leading-[14.32px] mb-1">
                            Create date
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal break-words">
                            {createdDate}
                        </p>
                    </div>
                    <div className="flex-col text-white w-[66%] break-words">
                        <p className="text-[12px] leading-[14.32px] mb-1 font-normal">
                            Address
                        </p>
                        <p className="leading-[15.51px] text-[13px] font-normal">
                            {address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
