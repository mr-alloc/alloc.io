import { spinnerStore } from "@/store";


export const calPostDate = (date: string): string => {
    const timeValue = Date.parse(date)
    const milliSeconds = +new Date() - timeValue
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`

    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`

    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`

    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`

    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`

    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`

    const years = days / 365
    return `${Math.round(years)}년 전`

}

export const spinner = (status: boolean) => {
    spinnerStore.isOn = status
}

export const setPageTitle = (title: string) => {
    const blogName = 'taechnique 기술 블로그'
    document.title = title ? `${title} | ${blogName}` : blogName;
}






