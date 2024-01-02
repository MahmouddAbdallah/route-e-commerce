const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadSingle = (file) => {
    return multer({ storage: storage }).single(file);
}
const uploadMulti = (files, number) => {
    return multer({ storage: storage }).array(files, number)
}
module.exports = { uploadSingle, uploadMulti }

