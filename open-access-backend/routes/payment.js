import dotenv from "dotenv";
dotenv.config();

const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

router.get("/one-time", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2500,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.send({
    client_secret: paymentIntent.client_secret,
  });
});

router.post("/create-customer", async (req, res) => {
  const customer = await stripe.customers.create({
    payment_method: req.body.payment_method,
    email: req.body.email,
    invoice_settings: {
      default_payment_method: req.body.payment_method,
    },
  });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: process.env.STRIPE_SUB_ID }],
    expand: ["latest_invoice.payment_intent"],
    trial_period_days: 0,
  });

  res.send({
    subscription,
  });
});

export default router;
