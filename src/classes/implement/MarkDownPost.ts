import { parse } from "date-format-parse";

export default class MarkDownPost {

    private readonly _profileImage: string;
    private readonly _currentCompany: string;
    private readonly _currentPosition: string;
    private readonly _thumbnail: string;
    private readonly _categories: Array<string>;
    private readonly _tags: Array<string>;
    private readonly _date: Date;
    private readonly _isHide: boolean;
    private readonly _excerptSeparator: string;
    private readonly _layout: string;
    private readonly _description: string;
    private readonly _title: string;
    private readonly _body: string;

    constructor(profile_image: string, current_company: string, current_position: string, thumbnail: string, categories: string [], tags: string [], date: string, is_hide: boolean, excerpt_separator: string, layout: string, description: string, title: string, body: string) {
        this._profileImage = profile_image
        this._currentCompany = current_company
        this._currentPosition = current_position
        this._thumbnail = thumbnail
        this._categories = categories
        this._tags = tags
        this._date = parse(date, 'YYYY-MM-DD HH:mm:ss ZZ')
        this._isHide = is_hide
        this._excerptSeparator = excerpt_separator
        this._layout = layout
        this._description = description
        this._title = title
        this._body = body
    }


    get profileImage(): string {
        return this._profileImage;
    }

    get currentCompany(): string {
        return this._currentCompany;
    }

    get currentPosition(): string {
        return this._currentPosition;
    }

    get thumbnail(): string {
        return this._thumbnail;
    }

    get categories(): Array<string> {
        return this._categories;
    }

    get tags(): Array<string> {
        return this._tags;
    }

    get date(): Date {
        return this._date;
    }

    get isHide(): boolean {
        return this._isHide;
    }

    get excerptSeparator(): string {
        return this._excerptSeparator;
    }

    get layout(): string {
        return this._layout;
    }

    get description(): string {
        return this._description;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }
}
