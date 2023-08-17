const mongoose = require("mongoose");
const fs = require("fs");

const produitSchema = mongoose.Schema({
  nom: {
    type: String,
    required: [true, "please enter the product name"],
    unique: true,
  },
  desc: {
    type: String,
    required: [true, "please enter the product description"],
  },
  prix: { type: Number, required: [true, "please enter a valid price"] },
  qnt: {
    type: Number,
    required: [true, "please enter the quantite of this product"],
  },
  pictures: {
    type: [String],
    required: [true, "please enter the product pictures"],
  },
  categorie: {
    type: String,
    enum: ["categorie1", "categorie2", "categorie3"],
    required: [true, "please enter a valid category"],
  },
});

produitSchema.pre("findOneAndDelete", async function (next) {
  try {
    const data = await Produit.findOne(this);

    for (const file of data.pictures) {
      fs.unlinkSync(file);
      console.log(`Deleted file: ${file}`);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Produit = mongoose.model("Produit", produitSchema);
module.exports = Produit;
