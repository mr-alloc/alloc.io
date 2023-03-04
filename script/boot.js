const explore = require('./explore')
const refresh = require('./refresh')
const PostStore = require('./PostStore')

const __ROOT__ = process.env.PWD
const __DOCS__ = '/docs'
const __FILE_NODE__ = `${__ROOT__}/site/file-node.json`
const __POST_MAP__ = `${__ROOT__}/site/posts.json`

/* explore with recursive */
const fileNode = explore(__DOCS__)

/* Sort and indexing */
const posts = PostStore.sort((a, b) => b.header.date - a.header.date)
    .map((post) => {
        return post
    });

/* explored data for navigate */
refresh(__FILE_NODE__, fileNode)

/* posting list data */
refresh(__POST_MAP__, posts)




