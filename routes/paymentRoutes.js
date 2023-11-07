// // import express from "express";
// // import {
// //   checkout,
// //   paymentVerification,
// // } from "../controllers/paymentController.js";

// const express = require("express");
// const paymentController = require("../controllers/paymentController.js");

// const checkout = paymentController.checkout;
// const paymentVerification = paymentController.paymentVerification;

// // Now you can use 'express', 'checkout', and 'paymentVerification' as needed.


// const router = express.Router();

// router.route("/checkout").post(checkout);

// router.route("/paymentverification").post(paymentVerification);

// // export default router;
// module.exports = router;

const express = require("express");
const paymentController = require("../index.js");

const checkout = paymentController.checkout;
const paymentVerification = paymentController.paymentVerification;

const router = express.Router();

router.route("/checkout").post(async (req, res) => {
  try {
    const result = await checkout(req, res);
    // console.log(result)
    // Handle the response or additional logic here if needed
  } catch (error) {
    console.error("Error in /api/checkout:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.route("/paymentverification").post(async (req, res) => {
  try {
    const result = await paymentVerification(req, res);
    // Handle the response or additional logic here if needed
  } catch (error) {
    console.error("Error in /api/paymentverification:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;

