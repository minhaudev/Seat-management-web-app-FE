import {TypeStatus} from "@/enums/TypeStatusEnum";

export const nodes = [
    {
        id: "1",
        type: TypeStatus.SALE,
        specifications: "Tôn lạnh màu xanh ngọc AZ070 Phủ AF: 0.41mmx1200mm",
        totalCoil: "1",
        totalWeight: "7000",
        prime: {
            value: ["1B", "1A", "1", "3"],
            isDisabled: true
        },
        preferredTolerances: [
            {
                key: "kg",
                value: [3700, 4300]
            },
            {
                key: "m",
                value: [1209, 1300]
            }
        ],
        unitPrice: 31000,
        totalPrice: 217000000,
        rebatePrice: 300000000,
        discountPrice: 100000,
        status: "warning",
        action: ["delete"],
        oldPrice: 310000,
        finalPrice: 49000,
        nodes: []
    },
    {
        id: "2",
        type: TypeStatus.ORIGINAL,
        specifications: "Tôn lạnh màu xanh ngọc AZ070 Phủ AF: 0.41mmx1200mm",
        totalCoil: "2",
        totalWeight: "8000",
        prime: "1B",
        preferredTolerances: [
            {
                key: "kg",
                value: [3800, 4500]
            },
            {
                key: "m",
                value: [1250, 1400]
            }
        ],
        unitPrice: 32000,
        totalPrice: 256000000,
        status: "success",
        rebatePrice: 330000000,
        discountPrice: 20000000,
        action: ["delete"],
        oldPrice: 320000,
        finalPrice: 51000,
        nodes: []
    },
    {
        id: "3",
        type: TypeStatus.ORIGINAL,
        specifications: "Tôn lạnh màu xanh ngọc AZ070 Phủ AF: 0.41mmx1200mm",
        totalCoil: "3",
        totalWeight: "9000",
        prime: "1B",
        preferredTolerances: [
            {
                key: "kg",
                value: [4000, 4700]
            },
            {
                key: "m",
                value: [1300, 1450]
            }
        ],
        unitPrice: 33000,
        totalPrice: 297000000,
        rebatePrice: 350000000,
        discountPrice: 25000000,
        status: "error",
        action: ["delete", "edit"],
        oldPrice: 330000,
        finalPrice: 52000,
        nodes: []
    },
    {
        id: "4",
        type: TypeStatus.SALE,
        specifications: "Tôn lạnh màu xanh ngọc AZ070 Phủ AF: 0.41mmx1200mm",
        totalCoil: "4",
        totalWeight: "400",
        prime: "1B",
        preferredTolerances: [
            {
                key: "kg",
                value: [4100, 4800]
            },
            {
                key: "m",
                value: [1350, 1500]
            }
        ],
        unitPrice: 34000,
        totalPrice: 323000000,
        status: "success",
        rebatePrice: 370000000,
        discountPrice: 30000000,
        action: ["delete", "edit"],
        oldPrice: 340000,
        finalPrice: 53000,
        nodes: []
    }
];
