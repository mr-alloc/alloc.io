const fs = require("fs");

module.exports = (path, data) => {
    fs.rmSync(path, {
        force: true
    })

    fs.writeFileSync(path, JSON.stringify(data), {
        encoding: 'utf-8'
    })
}
