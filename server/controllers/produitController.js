const Produit = require("../models/Produit");
const fs = require("fs");

// CREATE (POST)
exports.createProduit = async (req, res) => {
  try {
    // Extract the uploaded files' paths
    const filePaths = req.files.map((file) => file.path);

    // Create the product with the picturePath attribute set to the file paths
    const produit = await Produit.create({
      nom: req.body.nom,
      desc: req.body.desc,
      prix: req.body.prix,
      qnt: req.body.qnt,
      categorie: req.body.categorie,
      pictures: filePaths, // Save an array of file paths for multiple files
    });

    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL (GET)
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE (GET)
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (produit) {
      res.status(200).json(produit);
    } else {
      res.status(404).json({ message: "Produit not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE (PUT) this doesn't touch the pictures
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) res.status(404).json({ message: "Produit not found" });
    if (req.body.nom) produit.nom = req.body.nom;
    if (req.body.desc) produit.desc = req.body.desc;
    if (req.body.prix) produit.prix = req.body.prix;
    if (req.body.qnt) produit.qnt = req.body.qnt;
    if (req.body.categorie) produit.categorie = req.body.categorie;
    await produit.save();
    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE (pics are deleted in the pre function in the model)
exports.deleteProduit = async (req, res) => {
  try {
    const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
    if (deletedProduit) {
      res.status(200).json({ message: "Produit deleted successfully" });
    } else {
      res.status(404).json({ message: "Produit not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
