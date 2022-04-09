const multerFilter = (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]
    if (ext === "jpeg" || ext === "png" || ext === "gif") {
      cb(null, true);
    } else {
      cb(new Error("Not a Image File!!"), false);
    }
  };

module.exports = multerFilter