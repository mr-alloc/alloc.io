import {appCache} from "~/store/appCache";
import {FileNode} from "~/class/implement/FileNode";

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

export const setPageTitle = (title: string) => {
    const blogName = appCache.blogInfo.title
    document.title = title ? `${title} | ${blogName}` : blogName;
}


export function groupingBy<T, E>(contents: E[], keyMapper: (content: E) => T): Map<T, E[]> {
    const map = new Map<T, E[]>()
    for (let content of contents) {
        const key: T = keyMapper(content)
        const array = map.has(key)
            ? map.get(key)
            : []

        if (array) {
            array.push(content)
            map.set(key, array)
        }
    }
    return map
}

export function toMap<T, E>(contents: E[], keyMapper: (content: E) => T): Map<T, E> {
    const map = new Map<T, E>()
    for (let content of contents) {
        const key: T = keyMapper(content)
        if (map.has(key)) {
            throw Promise.reject(`Can\'t Mapped by duplicated key '${key}'. `)
        }
        map.set(key, content)
    }
    return map
}

export function getFileIcon(node: FileNode) {
    let iconName;
    if(node.hasIcon()) {
        iconName = node._name
    } else if(node.isDirectory()) {
        iconName = 'folder_default'
    } else {
        iconName = 'post_default'
    }
    return iconName
}


