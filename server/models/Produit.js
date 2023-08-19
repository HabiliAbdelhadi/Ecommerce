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
    required: [true, "please enter the quantity of this product"],
  },
  pictures: {
    type: [String],
    required: [true, "please enter the product pictures"],
  },
  categorie: {
    type: String,
    enum: ["lunettes", "chapeaux", "bijoux", "sacs"],
    required: [true, "please enter a valid category"],
  },
  sex: { type: String, enum: ["homme", "femme", "unisex"], default: "unisex" },
  featured: { type: Boolean, default: false },
});

produitSchema.pre("findOneAndDelete", async function (next) {
  try {
    const data = await Produit.findOne(this);

    for (const file of data.pictures) {
      fs.unlinkSync(file);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Produit = mongoose.model("Produit", produitSchema);
module.exports = Produit;
