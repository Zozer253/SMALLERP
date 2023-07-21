const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/prodControllers");

// Configuration du middleware Multer pour gérer le téléchargement des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const ext = path.extname(file.originalname);
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Extension de fichier non valide."));
  }
};

const upload = multer({ storage, fileFilter });

// Routes

router.get("/products", getProducts);
router.post("/products", upload.single("imageFile"), createProduct);
router.put("/products/:id", upload.single("imageFile"), updateProduct);
router.delete("/products/:id", deleteProduct);
router.use("/images", express.static(path.join(__dirname, "../images")));

module.exports = router;
