const multer = require('multer')

const uploadProfileDir = `${process.cwd()}/uploads`

const uploadProfile = multer({dest: uploadProfileDir})

module.exports = {uploadProfile}