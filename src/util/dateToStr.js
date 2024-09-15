export default function dateToStr(date) {
    return date.toDateString() + " at " + date.toTimeString().split(' ')[0];
}