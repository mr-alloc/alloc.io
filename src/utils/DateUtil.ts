export function dateToStr(date: Date) {
    const year = date.getFullYear()
    const computedMonth = date.getMonth() + 1
    const month = computedMonth < 10 ? `0${computedMonth}` : computedMonth;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${year}-${month}-${day}`
}
