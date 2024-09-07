import Image from "~/core/classes/Image";
import parser from "jekyll-markdown-parser";

const propertyRE = /src="([^"]+)"(?: alt="([^"]+)")?/
const imgRE = /<img.*?>/g

//html string을 가져와 img  tag의 src를 출출하여 배열로 리턴
export default function (content: string): Array<Image> {
    const md = parser.parse(content)
    imgRE.lastIndex = 0;
    const matchedImageTags  = md.html.match(imgRE) ?? [];

    return matchedImageTags.map(tags => propertyRE.exec(tags))
        .filter(executed => executed != null)
        .map(executed => new Image(
            executed?.[1] ?? '',
            executed?.[2] ?? ''
        ));
}
