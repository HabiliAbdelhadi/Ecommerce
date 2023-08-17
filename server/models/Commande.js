const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const commandeSchema = mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Please enter the buyer's name"],
  },
  prenom: {
    type: String,
    required: [true, "Please enter the buyer's name"],
  },
  tel: {
    type: String,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate the Algerian phone number
        return (
          isMobilePhone(value, "ar-DZ") ||
          /^0(21|23|24|25|26|27|29|31|32|33|34|35|36|37|38|39|41|43|44|45|46|48|49|50|51|52|53|55|56|57|58|59|61|65|66|67|68|69|70|71|72|73|74|75|76|77|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99)\d{6}$/.test(
            value
          )
        );
      },
      message: "Please enter a valid Algerian phone number",
    },
    required: [true, "Please enter a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],

    lowercase: true,
    validate: [isEmail, "Please enter a valid email"], //npm i validator
  },
  adrs: { type: String, required: [true, "please enter a valid addres"] },
  produit: { type: mongoose.Types.ObjectId, ref: "Produit", required: true },
  valid: { type: Boolean, default: false },
});

const Commande = mongoose.model("Commande", commandeSchema);
module.exports = Commande;
