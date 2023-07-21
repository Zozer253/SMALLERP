const express = require("express")
const router = express.Router();
const cotationController = require("../controllers/cotationController")

router.post("/cotation/create", cotationController.createCotation);
router.post("/cotation/product", cotationController.postCotationProduit);
router.get("/cotations", cotationController.getAllCotations);
router.get("/cotation/:cotationId", cotationController.getCotationById);
router.delete("/cotation/:cotationId", cotationController.deleteCotation);


module.exports = router