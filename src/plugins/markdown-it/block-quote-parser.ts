import MarkdownIt from "markdown-it";
import StateBlock from "markdown-it/lib/rules_block/state_block";
import Token from "markdown-it/lib/token";
import {isSpace} from 'markdown-it/lib/common/utils';
import TemplateExpression from "@/markup/template/TemplateExpression";
import TemplateAttributes from "@/markup/template/TemplateAttributes";

type ExtendedToken = Token & {
    map?: number[];
    meta?: {
        template?: TemplateAttributes;
    };
}

function blockquote(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
    let adjustTab = false,
        ch: number,
        i: number,
        initial: number,
        l: number,
        lastLineEmpty: boolean,
        nextLine = startLine + 1,
        offset: number,
        oldBMarks: number[],
        oldBSCount: number[],
        oldIndent: number,
        oldSCount: number[],
        oldTShift: number[],
        spaceAfterMarker: boolean,
        terminate: boolean,
        terminatorRules,
        token: ExtendedToken,
        isOutdented: boolean,
        oldLineMax = state.lineMax,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    let templateAttrs: TemplateAttributes | null = null;
    let templateLine: number | null = null;

    if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
    }
    if (state.src.charCodeAt(pos++) !== 0x3E/* > */) {
        return false;
    }
    if (silent) {
        return true;
    }

    initial = offset = state.sCount[startLine] + 1;

    if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
    } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;
        if ((state.bsCount[startLine] + offset) % 4 === 3) {
            pos++;
            initial++;
            offset++;
            adjustTab = false;
        } else {
            adjustTab = true;
        }
    } else {
        spaceAfterMarker = false;
    }

    oldBMarks = [state.bMarks[startLine]];
    state.bMarks[startLine] = pos;

    while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
            if (ch === 0x09) {
                offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
            } else {
                offset++;
            }
        } else {
            break;
        }
        pos++;
    }

    oldBSCount = [state.bsCount[startLine]];
    state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

    lastLineEmpty = pos >= max;

    oldSCount = [state.sCount[startLine]];
    state.sCount[startLine] = offset - initial;

    oldTShift = [state.tShift[startLine]];
    state.tShift[startLine] = pos - state.bMarks[startLine];

    terminatorRules = state.md.block.ruler.getRules('blockquote');

    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        let line = state.src.slice(pos, max);

        // Template 확인
        if (TemplateExpression.test(line.trim())) {
            templateLine = nextLine;
            templateAttrs = TemplateAttributes.parse(line.trim());
            break;  // return true 대신 break를 사용
        }

        if (pos >= max) {
            break;
        }

        isOutdented = state.sCount[nextLine] < state.blkIndent;

        if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
            initial = offset = state.sCount[nextLine] + 1;

            if (state.src.charCodeAt(pos) === 0x20 /* space */) {
                pos++;
                initial++;
                offset++;
                adjustTab = false;
                spaceAfterMarker = true;
            } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
                spaceAfterMarker = true;
                if ((state.bsCount[nextLine] + offset) % 4 === 3) {
                    pos++;
                    initial++;
                    offset++;
                    adjustTab = false;
                } else {
                    adjustTab = true;
                }
            } else {
                spaceAfterMarker = false;
            }

            oldBMarks.push(state.bMarks[nextLine]);
            state.bMarks[nextLine] = pos;

            while (pos < max) {
                ch = state.src.charCodeAt(pos);
                if (isSpace(ch)) {
                    if (ch === 0x09) {
                        offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
                    } else {
                        offset++;
                    }
                } else {
                    break;
                }
                pos++;
            }

            lastLineEmpty = pos >= max;

            oldBSCount.push(state.bsCount[nextLine]);
            state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] = offset - initial;

            oldTShift.push(state.tShift[nextLine]);
            state.tShift[nextLine] = pos - state.bMarks[nextLine];
            continue;
        }

        if (lastLineEmpty) {
            break;
        }

        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
            if (terminatorRules[i](state, nextLine, endLine, true)) {
                terminate = true;
                break;
            }
        }

        if (terminate) {
            state.lineMax = nextLine;
            if (state.blkIndent !== 0) {
                oldBMarks.push(state.bMarks[nextLine]);
                oldBSCount.push(state.bsCount[nextLine]);
                oldTShift.push(state.tShift[nextLine]);
                oldSCount.push(state.sCount[nextLine]);
                state.sCount[nextLine] -= state.blkIndent;
            }
            break;
        }

        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = -1;
    }

    oldIndent = state.blkIndent;
    state.blkIndent = 0;

    token = state.push('blockquote_open', 'blockquote', 1) as ExtendedToken;
    token.markup = '>';
    token.map = [startLine, 0];
    if (templateAttrs) {
        token.meta = {template: templateAttrs};
    }

    // blockquote 내부 컨텐츠를 파싱하기 위한 상태 설정
    let oldParentType = state.parentType;
    state.parentType = 'blockquote';

    // 각 라인의 '>' 마커 제거
    for (let line = startLine; line < (templateLine || nextLine); line++) {
        if (state.src.charCodeAt(state.bMarks[line] + state.tShift[line]) === 0x3E /* > */) {
            state.tShift[line]++;
            state.bMarks[line]++;
        }
    }

    // 내부 컨텐츠 파싱
    state.md.block.tokenize(state, startLine, (templateLine || nextLine) + 1);

    // 상태 복원
    state.parentType = oldParentType;

    token = state.push('blockquote_close', 'blockquote', -1) as ExtendedToken;
    token.markup = '>';

    state.lineMax = oldLineMax;
    if (token.map) {
        token.map[1] = state.line;
    }

    for (i = 0; i < oldTShift.length; i++) {
        state.bMarks[i + startLine] = oldBMarks[i];
        state.tShift[i + startLine] = oldTShift[i];
        state.sCount[i + startLine] = oldSCount[i];
        state.bsCount[i + startLine] = oldBSCount[i];
    }
    state.blkIndent = oldIndent;

    if (templateLine) {
        state.line = templateLine + 1;
    }

    return true;
}

export default (md: MarkdownIt) => {
    md.block.ruler.disable('blockquote');
    md.block.ruler.before('fence', 'blockquote', blockquote);
};