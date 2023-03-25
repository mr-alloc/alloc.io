export default class Switch {
    readonly _default: boolean
    readonly _change: Function

    constructor(_default: boolean, _change: Function) {
        this._default = _default
        this._change = _change
    }

    collapse(): boolean {
        return this._change()
    }
}
