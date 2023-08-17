const { Router } = require("express");
const produitController = require("../controllers/produitController");
const multer = require("../middleware/multerConfig");
const produitRouter = Router();

produitRouter.post(
  "/produits",
  multer.uploadMulti,
  produitController.createProduit
);
produitRouter.get("/produits", produitController.getAllProduits);
produitRouter.get("/produits/:id", produitController.getProduitById);
produitRouter.put("/produits/:id", produitController.updateProduit);
produitRouter.delete("/produits/:id", produitController.deleteProduit);
module.exports = produitRouter;
