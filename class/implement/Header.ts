export class Header {
    layout: string
    title: string
    categories: string[]
    tags: string[]
    date: Date
    thumbnail: string
    current_company: string
    current_position: string
    profile_image: string
    summary: string
    excerpt_separator: string
    hide: boolean
    breadcrumbs: string[]

    constructor(header: any) {
        this.layout = header.layout
        this.title = header.title
        this.categories = header.categories
        this.tags = header.tags
        this.date = new Date(header.date)
        this.thumbnail = this.getOrDefaultThumbnail(header.thumbnail)
        this.current_company = header.current_company
        this.current_position = header.current_position
        this.profile_image = header.profile_image
        this.summary = header.summary
        this.excerpt_separator = header.excerpt_separator
        this.hide = header.hide
        this.breadcrumbs = header.breadcrumbs

    }

    getOrDefaultThumbnail (path :string | undefined | null): string {
        const defaultImages = ['default1.JPG', 'default2.jpeg', 'default3.jpeg']//, 'default4.jpeg', 'default5.JPG']
        const r = Math.floor(Math.random() * defaultImages.length)
        const returnPath = path ? path : `/assets/blogging/default/${defaultImages[r]}`

        return returnPath
    }
}
