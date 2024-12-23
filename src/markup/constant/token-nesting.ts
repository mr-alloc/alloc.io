export type Nesting = 1 | 0 | -1;
/**
 * @see 'markdown-it/lib/token'
 */
export enum TokenNesting {

    OPEN = 1,
    SELF_CLOSE = 0,
    CLOSE = -1,
}
