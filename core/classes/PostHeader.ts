import type Image from "~/core/classes/Image";
import type TocNode from "~/core/classes/TocNode";

export default class PostHeader {

    private static readonly HIDE = "hide";
    private static readonly BREADCRUMBS = "breadcrumbs";
    private static readonly SUMMARY = "summary";
    private static readonly IMAGES = "images";
    private static readonly HEADLINES = "headlines";
    private static readonly DATE = "date";

    private readonly _value: any;

    private constructor(value: any) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    get(name: string): string {
        return this._value[name] ?? '';
    }

    summary(defaultValue: string): string {
        return this._value[PostHeader.SUMMARY] ?? defaultValue;
    }

    date(): any {
        return this._value[PostHeader.DATE] ?? '';
    }

    set breadcrumbs(breadcrumbs: Array<string>) {
        this._value[PostHeader.BREADCRUMBS] = breadcrumbs;
    }

    set images(images: Array<Image>) {
        this._value[PostHeader.IMAGES] = images;
    }

    set headlines(tocNode: TocNode) {
        this._value[PostHeader.HEADLINES] = tocNode;
    }


    hide(defaultValue: boolean): boolean {
        return this._value[PostHeader.HIDE] ?? defaultValue;
    }

    public static of(value: any): PostHeader {
        return new PostHeader(value);
    }

}
