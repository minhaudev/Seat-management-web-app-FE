import React from "react";
import CreditCart from "@/components/atoms/CreditCart";
import CustomerBalanceInfo from "@/components/atoms/AccountBalance";
import {infoCartList} from "@/faker/CreditCart";
import {dataList} from "@/faker/AccountBalance";

export default function Index() {
    return (
        <div>
            <div className="px-[16.5px] w-full gap-4 flex justify-between">
                <div className="w-[27%]">
                    <CreditCart infoCartList={infoCartList} />
                </div>
                <div className="w-[73%]">
                    <CustomerBalanceInfo dataList={dataList} />
                </div>
            </div>
        </div>
    );
}
