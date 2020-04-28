import dotenv from "dotenv";
dotenv.config();

const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

const { User, Charge, Subscription } = require("../database");

router.get("/intent", async (req, res) => {
  try {
    if (!req.authorized) return res.status(403).send({ error: "Forbidden" });

    const { username } = req;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ error: "User not found." });

    const intent = await stripe.paymentIntents.create({
      amount: 2500,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    return res.send({ client_secret: intent.client_secret });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

router.post("/save-charge", async (req, res) => {
  try {
    if (!req.authorized) return res.status(403).send({ error: "Forbidden" });

    const { username } = req;
    const {
      stripePaymentIntentId,
      stripePaymentMethodId,
      amount,
      createdAt,
    } = req.body;
    const charge = await Charge.create({
      stripePaymentIntentId,
      stripePaymentMethodId,
      username,
      amount,
      createdAt,
    });

    return res.send({ charge });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

router.post("/create-subscription", async (req, res) => {
  try {
    if (!req.authorized) return res.status(403).send({ error: "Forbidden" });

    const {
      username,
      email,
      authorized,
      body: { payment_method, subscribed },
    } = req;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ error: "User not found." });

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });
    user.stripeCustomerId = customer.id;
    user.stripePaymentMethodId = payment_method;
    await user.save();

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: process.env.STRIPE_SUB_ID }],
      expand: ["latest_invoice.payment_intent"],
      trial_period_days: 0,
    });

    await Subscription.create({
      stripeSubscriptionId: subscription.id,
      stripePlanId: subscription.plan.id,
      stripeCustomerId: subscription.customer,
      username,
      amount: 2500,
      createdAt: subscription.created,
    });

    return res.send({
      subscription,
    });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

export default router;
