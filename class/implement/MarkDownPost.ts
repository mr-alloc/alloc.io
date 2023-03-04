import { parse } from "date-format-parse";

export class MarkDownPost {

    profile_image: string
    current_company: string
    current_position: string

    thumbnail: string
    categories: string []
    tags: string []
    date: Date
    is_hide: boolean
    excerpt_separator: string
    layout: string
    description: string
    title: string
    body: string

    constructor(profile_image: string, current_company: string, current_position: string, thumbnail: string, categories: string [], tags: string [], date: string, is_hide: boolean, excerpt_separator: string, layout: string, description: string, title: string, body: string) {
        this.profile_image = profile_image
        this.current_company = current_company
        this.current_position = current_position
        this.thumbnail = thumbnail
        this.categories = categories
        this.tags = tags
        this.date = parse(date, 'YYYY-MM-DD HH:mm:ss ZZ')
        this.is_hide = is_hide
        this.excerpt_separator = excerpt_separator
        this.layout = layout
        this.description = description
        this.title = title
        this.body = body
    }

}
