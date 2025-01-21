import MarkdownIt from "markdown-it";
import StateBlock from "markdown-it/lib/rules_block/state_block";
import {findCloseIndex} from "@/markup/utils/markdown-it-util";
import Token from "markdown-it/lib/token";

function extractTextWrappingOption(executed: RegExpExecArray | null): any {
    if (executed === null) {
        return {};
    }

    return Object.assign({}, JSON.parse(executed[1]));
}

function textWrappingBlock(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {

    const OPEN_MARKER = '::text-wrapping';
    const CLOSE_MARKER_RE = /^::s*(\{[\s\S]*\})?\s*$/m;

    if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
    }

    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // Check if the start of a group
    if (state.src.slice(pos, max).trim() !== OPEN_MARKER) {
        return false;
    }

    let nextLine = startLine;
    let option = {};

    // Search for the end of the block
    while (nextLine < endLine) {
        nextLine++;
        const endMarkerPos = state.bMarks[nextLine] + state.tShift[nextLine];
        const endMarkerMax = state.eMarks[nextLine];

        const line = state.src.slice(endMarkerPos, endMarkerMax).trim();
        const isEndLine = CLOSE_MARKER_RE.test(line);
        CLOSE_MARKER_RE.lastIndex = 0;
        if (isEndLine) {
            option = Object.assign(option, extractTextWrappingOption(CLOSE_MARKER_RE.exec(line)));
            break;
        }
    }

    if (nextLine >= endLine) {
        return false;
    }
    let token: Token;
    if (!silent) {
        state.line = nextLine + 1;

        token = state.push('text_wrapping_open', 'div', 1);
        token.meta = {};
        token.meta['option'] = option;
        token.map = [startLine, state.line];

        state.md.block.tokenize(state, startLine + 1, nextLine);

        token = state.push('text_wrapping_close', 'div', -1);
        token.meta = {};
        token.meta['option'] = option;
    }

    state.line = nextLine + 1;
    return true;
}

export default (md: MarkdownIt) => {
    md.block.ruler.before('fence', 'text_wrapping', textWrappingBlock, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules['text_wrapping_open'] = function(tokens, idx) {
        //TODO algin 처리
        const close = findCloseIndex('text_wrapping_close', tokens, idx);
        const openToken = tokens[idx];
        const closeToken = tokens[close];


        return `<div>\n`;
    };

    md.renderer.rules['text_wrapping_close'] = function(tokens, idx) {
        //TODO algin 처리
        return `</div>\n`;
    };
}
