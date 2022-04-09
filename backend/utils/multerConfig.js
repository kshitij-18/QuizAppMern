const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const filename = file.originalname.split(".")[0]
        cb(null, `admin-${filename}-${Date.now()}.${ext}`);
      },
})

module.exports = multerStorage
