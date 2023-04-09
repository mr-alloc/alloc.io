const explore = require('./explore')
const postStore = require('./postStore')
const refresh = require('./refresh')
const createSitemap = require('./createSitemap')

const __ROOT__ = process.env.PWD
const __DOCS__ = '/docs'
const __FILE_NODE__ = `${__ROOT__}/static/file-node.json`
const __POSTS__ = `${__ROOT__}/static/posts.json`
const __KEYS__ = `${__ROOT__}/static/keys.json`
const __SITEMAP__ = './public/sitemap.xml'

/* explore with recursive */
const fileNode = explore(__DOCS__)
const routePaths = new Array()
/* Sort and indexing */
const posts = postStore.sort((a, b) => b.header.date - a.header.date)
    .map((post) => {
        routePaths.push(post._path)
        return post
    });

createSitemap().then((data) => {
    const file = data.toString().replace(/\\"/g, '"')
    console.log(file)
    refresh(__SITEMAP__, file)
})

/* explored data for navigate */
refresh(__FILE_NODE__, fileNode)

/* posting list data */
refresh(__POSTS__, posts)

/* routing paths for routing */
refresh(__KEYS__, routePaths)








