export class ScrollStatus {

    private _didScroll: boolean
    private _lastScrollTop: number
    private readonly _delta: number
    private _header: HTMLElement | null
    private _isDown: boolean

    constructor(didScroll: boolean, lastScrollTop: number, delta: number) {
        this._didScroll = didScroll
        this._lastScrollTop = lastScrollTop
        this._delta = delta
        this._header = null
        this._isDown = false
    }

    loadHeader(): void {
        this._header = document.getElementById('main-header')!
    }

    get didScroll(): boolean {
        return this._didScroll
    }

    get lastScrollTop(): number {
        return this._lastScrollTop
    }

    get delta(): number {
        return this._delta
    }

    get header(): HTMLElement {
        return this._header!
    }

    get isDown(): boolean {
        return this._isDown
    }

    on(): void {
        this._didScroll = true
    }

    off(): void {
        this._didScroll = false
    }

    hasScrolled(): void {
        const scrollTop = window.scrollY

        // 설정한 delta 값보다 더 스크롤되었는지를 확인한다.
        if (Math.abs(this._lastScrollTop - scrollTop) <= this._delta) {
            return
        }

        if (scrollTop > this.lastScrollTop && scrollTop > this._header!.clientHeight) {
            this._isDown = true
        } else {
            if (scrollTop + window.outerHeight < document.getElementById('application-container')!.clientHeight) {
                this._isDown = false
            }
        }
        this._lastScrollTop = scrollTop
    }

    checkScroll(): void {
        setInterval(() => {
            if (this._didScroll) {
                this.hasScrolled()
                this._didScroll = false
            }
        }, 250)
    }

    static ofDefault() {
        return new ScrollStatus(false, 0, 5);
    }
}
