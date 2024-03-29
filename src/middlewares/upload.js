import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const multerUpload = multer({
  storage: multer.diskStorage({
    // destination: (req, file, cb) => {
    //   if (file.fieldname === 'image') {
    //     cb(null, './images');
    //   } else {
    //     cb(null, './public/video');
    //   }
    // },
    filename: (req, file, cb) => {
      const name = crypto.randomBytes(30).toString('hex');
      const ext = path.extname(file.originalname);
      const filename = `${name}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      // filter mimetype
      if (
        file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb({ message: 'extension file only can .jpg, .jpeg, and .png' }, false);
      }
    } else {
      cb({ message: 'extension file only can .jpg, .jpeg, and .png' }, false);
    }
  },
  limits: { fileSize: 50000000 },
});

// middleware
export default (req, res, next) => {
  const multerFields = multerUpload.fields([
    {
      name: 'image',
      maxCount: 5,
    }
  ]);
  multerFields(req, res, (err) => {
    if (err) {
      console.log(err)
      let errorMessage = err.message;
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = `File ${err.field} too large, max 50mb`;
      }
      res.json({
        message: "Error"
      })
    } else {
      next();
    }
  });
};