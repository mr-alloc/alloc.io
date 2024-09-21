const NEW_LINE = 0x0A; /* \n */

export function countNewline(src: string): number {
    if (!src) return 0;
    return Array.from(src)
        .filter((_, index) => src.codePointAt(index) === NEW_LINE).length;
}

export function countPerNewline(src: string): number {
    if (!src) return 0;
    return src.split(String.fromCharCode(NEW_LINE)).length;
}
