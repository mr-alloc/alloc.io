import Image from "@core/classes/image";
import MarkdownIt from "markdown-it";

const propertyRE = /src="([^"]+)"(?: alt="([^"]+)")?/
const imgRE = /<img.*?>/g
const markdownIt = new MarkdownIt();

//html string을 가져와 img  tag의 src를 출출하여 배열로 리턴
export default function (content: string): Array<Image> {
    imgRE.lastIndex = 0;

    const html = markdownIt.render(content);
    const matchedImageTags = html.match(imgRE) ?? [];

    return matchedImageTags.map(tags => propertyRE.exec(tags))
        .filter(executed => executed != null)
        .map(executed => new Image(
            executed?.[1] ?? '',
            executed?.[2] ?? ''
        ));
}
