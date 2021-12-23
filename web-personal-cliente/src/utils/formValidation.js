export function minLengthValidations(inputData, minLength) {
    const { value } = inputData;
    removeClassError(inputData);
    if (value.length >= minLength) {
        inputData.classList.add("sucess")
        return true;
    } else {
        inputData.classList.add("error")
        return false;
    }

}

export function emailValidate(inputData) {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;
    removeClassError(inputData);
    if (emailValid.test(value)) {
        inputData.classList.add("sucess")
        return true;
    } else {
        inputData.classList.add("error")
        return false;
    }
}

function removeClassError(inputData) {
    inputData.classList.remove("sucess");
    inputData.classList.remove("error");
}