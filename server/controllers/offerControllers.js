const db = require("../models");

const submitOffer = async (req, res) => {
  try {
    const { description, prix } = req.body;
    const cotationId = (req.body.cotation_id);

    console.log(cotationId)

    if (isNaN(cotationId)) {
      return res.status(400).json({ message: "Identifiant de cotation invalide" });
    }

    const cotation = await db.Cotations.findByPk(cotationId);

    if (!cotation) {
      return res.status(404).json({ message: "Demande de cotation introuvable" });
    }

    // Créer l'offre
    const newOffer = await db.Offres.create({
      description,
      total: prix,
      cotationId,
    });

    return res.status(201).json({
      message: "Offre soumise avec succès",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la soumission de l'offre :", error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la soumission de l'offre.",
    });
  }
};

module.exports = { submitOffer };
