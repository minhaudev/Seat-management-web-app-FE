export const formatPrice = (vndAmount: number) => {
    const formattedVnd = vndAmount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND"
    });

    return formattedVnd.replace(/\./g, ",").replace("₫", "").trim();
};
