const excluded = ['.DS_Store', 'directory-map']

module.exports = (filename) => {
    for(let not of excluded) {
        if(filename.includes(not)) {
            return false
        }
    }

    return true
}
