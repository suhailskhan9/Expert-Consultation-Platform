// import express from "express";
// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/paymentController.js";

const express = require("express");
const paymentController = require("../controllers/paymentController.js");

const checkout = paymentController.checkout;
const paymentVerification = paymentController.paymentVerification;

// Now you can use 'express', 'checkout', and 'paymentVerification' as needed.


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

// export default router;
module.exports = router;

