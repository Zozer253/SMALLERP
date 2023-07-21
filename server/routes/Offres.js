const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerControllers");

// Route pour soumettre une offre
router.post("/offer", offerController.submitOffer);

module.exports = router;
