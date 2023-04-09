const fs = require("fs");

module.exports = (path, data, isString) => {
    fs.rmSync(path, {
        force: true
    })

    const dataString = isString
        ? data
        : JSON.stringify(data)

    fs.writeFileSync(path, dataString, {
        encoding: 'utf-8'
    })
}
