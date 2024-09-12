export default function isString(str) {
    if (str instanceof String || typeof str === 'string'){
        return true;
    } else {
        return false;
    }
}