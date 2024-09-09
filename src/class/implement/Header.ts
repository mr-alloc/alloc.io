import Image from "@/class/implement/Image";
import TocNode from "@/class/implement/TocNode";

export default class Header {
    private readonly _layout: string
    private readonly _title: string
    private readonly _categories: string[]
    private readonly _tags: string[]
    private readonly _date: Date
    private readonly _images: Image []
    private readonly _thumbnail: string
    private readonly _currentCompany: string
    private readonly _currentPosition: string
    private readonly _profileImage: string
    private readonly _summary: string
    private readonly _exposeImages: boolean
    private readonly _excerptSeparator: string
    private readonly _hide: boolean
    private readonly _breadcrumbs: string[]
    private readonly _rootHeadLine: TocNode

    constructor(header: any) {
        this._layout = header.layout;
        this._title = header.title;
        this._categories = header.categories;
        this._tags = header.tags;
        this._date = new Date(header.date);
        this._images = header.images.map((img: any) => new Image(img.src, img.alt));
        this._thumbnail = this.getOrDefaultThumbnail(header.thumbnail);
        this._currentCompany = header["current-company"];
        this._currentPosition = header["current-position"];
        this._profileImage = header["profile-image"];
        this._summary = header.summary;
        this._exposeImages = header["expose-images"];
        this._excerptSeparator = header["excerpt-separator"];
        this._hide = header.hide;
        this._breadcrumbs = header.breadcrumbs;
        this._rootHeadLine = TocNode.createRecursive(header.headlines);
    }
    get layout(): string {
        return this._layout
    }

    get title(): string {
        return this._title
    }

    get categories(): string[] {
        return this._categories
    }

    get tags(): string[] {
        return this._tags
    }

    get date(): Date {
        return this._date
    }

    get images(): Image[] {
        return this._images
    }

    get thumbnail(): string {
        return this._thumbnail
    }

    get currentCompany(): string {
        return this._currentCompany
    }

    get currentPosition(): string {
        return this._currentPosition
    }

    get profileImage(): string {
        return this._profileImage
    }

    get summary(): string {
        return this._summary
    }

    get exposeImages(): boolean {
        return this._exposeImages
    }

    get excerptSeparator(): string {
        return this._excerptSeparator
    }

    get hide(): boolean {
        return this._hide
    }

    get breadcrumbs(): string[] {
        return this._breadcrumbs
    }

    get rootHeadLine(): TocNode {
        return this._rootHeadLine
    }

    getOrDefaultThumbnail (path :string | undefined | null): string {
        const defaultImages = ['default1.JPG', 'default2.jpeg', 'default3.jpeg']//, 'default4.jpeg', 'default5.JPG']
        const r = Math.floor(Math.random() * defaultImages.length)

        return path ?? `/assets/blogging/default/${defaultImages[r]}`
    }
}
