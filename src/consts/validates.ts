export const fieldInput = {
    NAME: "name",
    PHONE: "phone",
    EMAIL: "email",
    ADDRESS: "address",
    COMPANY: "company",
    POSITION: "position",
    QUANTITY: "quantity",
    PASSWORD: "password",
    USERNAME: "username",
    BIRTHDAY: "birthday",
    TYPESEAT: "typeseat"
};

export const validateVietnameseName = /^[a-zA-ZÀ-ỹ\s]{2,}$/;
export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const patternPhone =
    /^((\+84|084|0084|84|0)(3|5|7|8|9)([0-9]{1})(\.?)(\s?)(\-?)([0-9]{3})(\.?)(\s?)(\-?)([0-9]{4}))$/;
export const textRequired = "không được để trống";
// export const emojiRegex = /^[\p{L}\p{N} !@#$%^&*()+=./,`~_\-]+$/u;
export const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const birthdayPattern =
    /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
