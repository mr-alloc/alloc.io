export class Pair<L,R> {
    _left: L
    _right: R

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
