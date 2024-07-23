import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert file URL to path

// Configure multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "face", maxCount: 1 },
  { name: "passport", maxCount: 1 },
]);

export default upload;
