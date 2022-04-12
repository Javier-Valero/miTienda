const functions = require("firebase-functions");
const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51Kj4NiDXhcebCoTAaUEAGaVEKVKOrnkSyduJOO8XOLtMTfUxbuiAX9j779g7Ie7t39IJil0PyAQhIUVDyEBt36FE005PvRWstQ"
);

const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));
/* app.use(cors({ origin: "https://mt02-9e1b9.web.app/" })) */
app.use(express.json());

//lo que llega procedente del frontend.
app.post("/api/checkout", async (req, res) => {
  console.log("Entro un poco");
  console.log(req.body);

  const { id, amount } = req.body;

  const mensaje_tarjeta_rechazada = { 
    "generic_decline": "Su tarjeta ha sido rechazada.",
    "insufficient_funds": "Su trajeta no tiene fondos suficientes.",
    "lost_card": "Esta tarjeta ha sido declarada como perdida.",
    "stolen_card": "Esta tarjeta ha sido declarada como robada.",
    "expired_card": "Esta tarjeta ha expirado",
    "incorrect_cvc": "El código CVC introducido no es correcto.",
    "processing_error": "Rechazo por error de procesamiento.",
    "incorrect_number": "Número incorrecto.",
  };

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Basket of products",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    return res.status(200).json({ message: "Pago realizado con éxito." });
  } catch (error) {
    const codigo = error.raw.code === "card_declined" ? error.raw.decline_code : error.raw.code
    return res.json({ message: mensaje_tarjeta_rechazada[codigo] });
  }
});


exports.app = functions.https.onRequest(app);
/* exports.app = functions.https.onCall(app) */
/* app.listen(3001, () => {
  console.log("Server on port", 3001);
}); */
