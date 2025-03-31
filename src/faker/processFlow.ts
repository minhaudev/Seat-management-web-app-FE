import {ProcessFlowProps, stateProcess} from "@/interfaces";
import ProductIcon from "@/assets/svgs/product.svg";
import ProductPlanIcon from "@/assets/svgs/plan.svg";
import DeliveryIcon from "@/assets/svgs/delivery.svg";
import PaymentIcon from "@/assets/svgs/payment.svg";
import SubmitIcon from "@/assets/svgs/submit.svg";

export const processFlowData: ProcessFlowProps[] = [
    {
        id: 1,
        label: "Product",
        icon: ProductIcon,
        line: true,
        state: stateProcess.ACTIVE
    },
    {
        id: 2,
        label: "Production plan",
        icon: ProductPlanIcon,
        line: true,
        state: stateProcess.NONE
    },
    {
        id: 3,
        label: "Delivery plan",
        icon: DeliveryIcon,
        line: true,
        state: stateProcess.NONE
    },
    {
        id: 4,
        label: "Payment plan",
        icon: PaymentIcon,
        line: true,
        state: stateProcess.NONE
    },
    {
        id: 5,
        label: "Submit",
        icon: SubmitIcon,
        line: false,
        state: stateProcess.NONE
    }
];
