import {
    birthdayPattern,
    emailPattern,
    fieldInput,
    passwordPattern,
    patternPhone,
    validateVietnameseName
} from "@/consts/validates";

export const validateField = (field: string, value: string) => {
    if (value.trim() === "") {
        return "Trường này không được để trống!";
    }
    switch (field) {
        case fieldInput.NAME:
            if (!validateVietnameseName.test(value)) {
                return "Họ tên không được để số và phải 2 ký tự trở lên";
            }
            return "";
        case fieldInput.USERNAME:
            if (value.trim().length < 3) {
                return "username phải 3 ký tự trở lên";
            }
            return "";
        case fieldInput.EMAIL:
            if (!emailPattern.test(value.trim())) {
                return "Địa chỉ email không hợp lệ!";
            }
            return "";
        case fieldInput.PASSWORD:
            if (value.trim().length < 8) {
                return "Mật khẩu phải lớn hơn 8 kí tự!";
            }
            return "";
        case fieldInput.BIRTHDAY:
            if (!birthdayPattern.test(value)) {
                return "Birthday không đúng định dạng!";
            }
    }
};
