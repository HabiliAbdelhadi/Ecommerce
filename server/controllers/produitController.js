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

// READ ALL (GET) + pagination

exports.getAllProduits = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const categorie = req.query.categorie || null;
  const minPrix = parseFloat(req.query.minPrix) || null;
  const maxPrix = parseFloat(req.query.maxPrix) || null;
  const sex = req.query.sex || null;
  const featured = req.query.featured || null;
  const search = req.query.search || null;

  try {
    let query = Produit.find();

    if (categorie) {
      query = query.where("categorie", categorie);
    }

    if (minPrix) {
      query = query.where("prix").gte(minPrix);
    }

    if (maxPrix) {
      query = query.where("prix").lte(maxPrix);
    }
    if (sex) {
      query = query.where("sex", sex);
    }
    if (featured) {
      query = query.where("featured", featured);
    }
    if (search) {
      query = query.where({
        $or: [
          { nom: { $regex: search, $options: "i" } },
          { marque: { $regex: search, $options: "i" } },
        ],
      });
    }
    const total = await Produit.countDocuments(query);
    const produits = await query.skip(skip).limit(limit);

    res.status(200).json({
      produits: produits,
      page: page,
      totalPages: Math.ceil(total / limit),
    });
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

// UPDATE (PUT) this doesn't touch the pictures ///////////////////////////////////////a revoir
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
