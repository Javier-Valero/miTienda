const functions = require("firebase-functions");
// const express = require("express");
// const Stripe = require("stripe");
// const stripe = new Stripe(
//   "sk_test_51Kj4NiDXhcebCoTAaUEAGaVEKVKOrnkSyduJOO8XOLtMTfUxbuiAX9j779g7Ie7t39IJil0PyAQhIUVDyEBt36FE005PvRWstQ"
// );

// exports.webhook = functions.https.onRequest((req, res) => {
//     console.log("MIBODY REQ",req.body);
//     res.send("Hello");
// });


exports.checkOut = functions.https.onCall((data, context) => {
  alert('epo________')
  return {
    nombre: "Javier",
    apellidos: "Valero Olaya",
    amount: data.amount,
    operator: '+',
    operationResult: 'Javier Valero, pastuqui',
  };
})