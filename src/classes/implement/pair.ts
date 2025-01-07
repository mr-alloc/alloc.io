export default class Pair<L,R> {
    private readonly _left: L
    private readonly _right: R

    constructor(left: L, right: R) {
        this._left = left
        this._right = right
    }

    get left(): L {
        return this._left
    }

    get right(): R {
        return this._right
    }
}
