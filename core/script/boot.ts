import { Dirent } from 'node:fs';
import type PostData from "~/core/classes/PostData";
import FileNode from "~/core/classes/FileNode";
import Filename from "~/core/classes/Filename";
import readMarkdown from "~/core/script/readMarkdown";
import Path from "~/core/classes/Path";
import {existsIcon, readDirectory} from "~/core/util/FileUtil";
import exclude from "~/core/script/excludeFileName";
import createSitemap from "~/core/script/createSitemap";
import refresh from "~/core/script/refresh";
import extractImages from "~/core/script/extractImages";
import extractHeadlines from "~/core/script/extractHeadlines";


const postDataList = new Array<PostData>();

const __DOCS__ = '/docs'
const __FILE_NODE__ = "/static/file-node.json";
const __POSTS__ = "/static/posts.json";
const __KEYS__ = "/static/keys.json";
const __SITEMAP__ = "/public/sitemap.xml";

function explore(path: string ) {
    const childFiles = createNode(path);
    for(const file of childFiles) {
        if(file.isDirectory()) {
            const filePath = `${path}/${file.name}`
            file.files = explore(filePath)
        }
    }
    return childFiles
}

/**
 *
 * @param wholePath
 * - /docs/algorithm
 * - /docs/algorithm/heap-sort.md
 * @param file
 */
function toFile (wholePath: Path, file: Dirent) {
    const filename = new Filename(file.name);

    const post = readMarkdown(wholePath)
    if (post.header.hide(false)) postDataList.push(post);

    return FileNode.forFile(wholePath, filename)
}

function toDirectory(wholePath: Path, file: Dirent) {
    return FileNode.forDirectory(wholePath, file.name, existsIcon(file.name));
}

function createNode(path: string) {
    return readDirectory(path)
        .filter(file => exclude(file.name))
        .map((file) => {
            const wholePath = Path.from(`${path}/${file.name}`);

            return file.isDirectory()
                ? toDirectory(wholePath, file)
                : toFile(wholePath, file)
        })
}


/* explore with recursive */
const fileNode = explore(__DOCS__);
const routePaths = new Array<string>();
/* Sort and indexing */
const posts = postDataList
    .sort((a, b) => b.header.date() - a.header.date())
    .map((post) => {
        routePaths.push(post.path)
        post.header.images = extractImages(post.content);
        post.header.headlines = extractHeadlines(post.content);
        return post
    });

createSitemap().then((data: any) => {
    const file = data.toString().replace(/\\(.)/mg, '$1')
    refresh(__SITEMAP__, file, true)
})

/* explored data for navigate */
refresh(__FILE_NODE__, fileNode)

/* posting list data */
refresh(__POSTS__, posts)

/* routing paths for routing */
refresh(__KEYS__, routePaths)








