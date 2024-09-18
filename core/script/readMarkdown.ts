import { parse } from 'jekyll-markdown-parser';
import PostData from "@core/classes/PostData";
import type Path from "@core/classes/Path";
import {read} from "@core/util/FileUtil";
import FileAlias from "@core/constant/FileAlias";

export default function (filePath: Path): PostData {

    const content = read(filePath.value);

    const md = parse(content);
    const contentRegex = new RegExp("([\\s\\S]*?)<!--more-->\\n?([\\s\\S]*)", 'gm')

    const header = md.parsedYaml
    if (header !== undefined) {
        header.date = header.date ? Date.parse(header.date) : 1999999999999;
        header.breadcrumbs = filePath.array.map(node => FileAlias.toNameIfAbsent(node));
    }
    const body: Array<string> = contentRegex.exec(md.markdown) ?? [];

    return new PostData(
        filePath.realValue.replace('.md', '').toLowerCase(),
        (header != null ? header : {}),
        ((body?.length >= 1) ? body[1] : ''),
        ((body?.length) >= 2 ? body[2] : ''))
}
