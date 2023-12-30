const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const config = require("../config/index.ts");

aws.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_ACCESS_KEY,
  region: "ap-southeast-1",
});

var s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sheba-bucket",
    key: function (req, file, cb) {
      var fileObj = {
        "image/png": ".png",
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg",
      };

      cb(
        null,
        file.fieldname.split(".")[0] + "-" + Date.now() + fileObj[file.mimetype]
      );
    },
  }),
  limits: {
    fileSize: 20971520,
  },
});

module.exports = upload;
