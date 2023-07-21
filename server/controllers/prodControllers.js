const { Products } = require("../models");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nom, statut, date, validated, visibility } = req.body;

    let photo = ""; // Initialisez la variable du nom de fichier à une chaîne vide

    if (req.file) {
      // Générer un nom unique pour l'image
      const fileName = Date.now() + "-" + req.file.originalname;

      // Déplacer le fichier vers le dossier d'images
      fs.renameSync(req.file.path, "images/" + fileName);

      // Enregistrez le nom complet du fichier (y compris l'extension) dans la base de données
      photo = fileName;
    }

    const newProduct = await Products.create({
      nom,
      statut,
      date,
      photo,
      validated,
      visibility,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, statut, date, validated, visibility } = req.body;

    const existingProduct = await Products.findOne({ where: { idProduit: id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    if (req.file) {
      // Supprimez l'ancienne image du dossier d'images
      if (existingProduct.photo) {
        fs.unlinkSync("images/" + existingProduct.photo);
      }

      // Générez un nouveau nom de fichier unique pour l'image
      const fileName = Date.now() + "-" + req.file.originalname;

      // Déplacez le fichier vers le dossier d'images
      fs.renameSync(req.file.path, "images/" + fileName);

      // Mettez à jour le nom complet du fichier dans la base de données
      existingProduct.photo = fileName;
    }

    existingProduct.nom = nom;
    existingProduct.statut = statut;
    existingProduct.date = date;
    existingProduct.validated = validated;
    existingProduct.visibility = visibility;

    await existingProduct.save();

    res.status(200).json(existingProduct);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Products.findOne({ where: { idProduit: id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    if (existingProduct.photo) {
      // Supprimez l'image du dossier d'images
      fs.unlinkSync("images/" + existingProduct.photo);
    }

    await existingProduct.destroy();

    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
};

module.exports = {getProducts, createProduct, updateProduct, deleteProduct };
