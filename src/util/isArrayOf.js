export default function isArrayOf(arr, type) {
    // Returns true if all elements of arr are typeof or instanceof type.
    for(let i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof type || typeof arr[i] === type)) {
            return false;
        }
    }
    return true;
};