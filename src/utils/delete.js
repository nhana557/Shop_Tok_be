import fs from 'fs'

export default (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}