const db = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Configuration SMTP pour l'envoi d'e-mails
  service: "gmail",
  auth: {
    user: "mbulalwanga81@gmail.com",
    pass: "kqfw yuym nyug woym",
  },
});

const postCotationProduit = async (req, res) => {
  try {
    const { quantité, cotation_idcotation, produit_idproduit } = req.body;

    const cotationProduct = await db.CotationProducts.create({
      quantité,
      cotation_idcotation,
      produit_idproduit: produit_idproduit, // Utiliser produit_idproduit au lieu de idproduit
    });

    res.status(201).json({
      message: "CotationProduct created successfully",
      cotationProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create CotationProduct" });
  }
};

const createCotation = async (req, res) => {
  try {
    const { description, date, etat, dureedevalidation, nom, produits } =
      req.body;

    const entreprise = await db.Entreprises.findOne({
      where: { nom },
      include: [{ model: db.Users, attributes: ["firstName", "email"] }],
    });

    if (!entreprise) {
      return res.status(404).json({ message: "Entreprise introuvable" });
    }

    const newCotation = await db.Cotations.create({
      description,
      date,
      etat,
      dureedevalidation,
      user_idUser: entreprise.idEntreprise,
    });

    const mailOptions = {
      from: "mbulalwanga81@gmail.com",
      to: entreprise.Users.map((user) => user.email),
      subject: "Nouvelle demande de cotation",
      text: `Une nouvelle demande de cotation a été créée !`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      } else {
        console.log("E-mail envoyé avec succès :", info.response);
      }
    });

    // Enregistrement des produits sélectionnés dans la table CotationProduits
    if (produits && produits.length > 0) {
      for (const produit of produits) {
        if (produit.id) {
          // Vérifier si l'ID du produit est défini
          await db.CotationProducts.create({
            quantité: produit.quantity,
            cotation_idcotation: newCotation.idcotation,
            produit_idproduit: produit.id,
          });
        }
      }
    }

    return res.status(201).json({
      message: "Demande de cotation soumise avec succès",
      cotation: newCotation,
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la soumission de la demande de cotation :",
      error
    );
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la soumission de la demande de cotation.",
    });
  }
};


const getAllCotations = async (req, res) => {
  try {
    const cotations = await db.Cotations.findAll({
      where: { etat: "En cours" },
      include: [
        {
          model: db.Users,
          attributes: ["firstName", "email"],
          include: [
            {
              model: db.Entreprises,
              attributes: [],
            },
          ],
        },
      ],
    });

    res.json(cotations);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des cotations :",
      error
    );
    return res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des cotations",
    });
  }
};

const getCotationById = async (req, res) => {
  try {
    const { cotationId } = req.params;

    const cotation = await db.Cotations.findOne({
      where: { idcotation: cotationId },
      include: [
        {
          model: db.Users,
          attributes: ["firstName", "email"],
          include: [
            {
              model: db.Entreprises,
              attributes: [],
            },
          ],
        },
      ],
    });

    if (!cotation) {
      return res
        .status(404)
        .json({ message: "Demande de cotation introuvable" });
    }

    return res.status(200).json({ cotation });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la demande de cotation :",
      error
    );

    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de la demande de cotation.",
    });
  }
};

const deleteCotation = async (req, res) => {
  const { cotationId } = req.params;

  try {
    // Vérifier si la cotation existe
    const cotation = await db.Cotations.findOne({
      where: { idcotation: cotationId },
    });

    if (!cotation) {
      return res.status(404).json({ message: "Cotation not found" });
    }

    // Supprimer la cotation
    await cotation.destroy();

    res.status(204).json({ message: "Cotation deleted successfully" });
  } catch (error) {
    console.error("Error deleting cotation:", error);
    res.status(500).json({ message: "Error deleting cotation" });
  }
};

module.exports = {
  createCotation,
  getAllCotations,
  getCotationById,
  deleteCotation,
  postCotationProduit,
};
