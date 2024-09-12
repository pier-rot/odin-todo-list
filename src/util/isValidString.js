import isEmptyString from "./isEmptyString";
import isString from "./isString";

export default function isValidString(str) {
    if (isString(str) && !isEmptyString(str)) {
        return true;
    } else {
        false;
    }
}