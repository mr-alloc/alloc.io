export default class Image {

    private readonly _src: string;
    private readonly _alt: string;

    constructor(src: string, alt: string) {
        this._src = src;
        this._alt = alt;
    }

    toJSON() {
        return {
            src: this._src,
            alt: this._alt
        }
    }
}
