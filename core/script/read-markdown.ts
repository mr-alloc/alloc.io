import {parse} from 'jekyll-markdown-parser';
import PostData from "@core/classes/post-data";
import type Path from "@core/classes/path";
import {read} from "@core/util/file-util";
import FileAlias from "@core/constant/file-alias";
import fm from 'front-matter';


export default function (filePath: Path): PostData {

    const content = read(filePath.value);

    const md = parse(content);
    const contentRegex = new RegExp("([\\s\\S]*?)<!--more-->\\n?([\\s\\S]*)", 'gm')

    const result = fm<any>(content);
    const header = Object.assign({}, result.attributes);
    const date = new Date(header.date);
    header.date = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    header.breadcrumbs = filePath.array.slice(0, filePath.array.length -1)
        .map(node => FileAlias.toNameIfAbsent(node));

    const body: Array<string> = contentRegex.exec(result.body) ?? ['', '', result.body];
    const path = filePath.realValue.replace('.md', '').toLowerCase();

    return new PostData(
        path,
        header,
        ((body?.length >= 1) ? body[1] : ''),
        ((body?.length) >= 2 ? body[2] : ''))
}
