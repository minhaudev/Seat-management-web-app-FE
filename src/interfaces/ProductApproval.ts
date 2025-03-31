type ProductApprovalItem = {
    id: string;
    No: string;
    Type: string;
    Specifications: string;
    TotalCoil: string;
    TotalWeight: string;
    Prime: {
        value: string[];
        isDisabled: boolean;
    };
    PreferredTolerances: {
        kg: number[];
        m: number[];
    };
    UnitPrice: number;
    TotalPrice: number;
    Status: string;
    Action: string[];
};
