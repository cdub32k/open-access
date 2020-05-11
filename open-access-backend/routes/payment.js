import dotenv from "dotenv";
dotenv.config();

const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

const { User, Charge, Subscription } = require("../database");

router.post("/process-payment", async (req, res) => {
  try {
    const {
      username,
      email,
      authorized,
      body: { payment_method, subscribed },
    } = req;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ error: "User not found." });

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        payment_method,
        email,
        invoice_settings: {
          default_payment_method: payment_method,
        },
      });
      user.stripeCustomerId = customer.id;
      user.stripePaymentMethodId = payment_method;
      await user.save();
    }

    if (subscribed) {
      const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
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
      });

      return res.send({
        subscription,
      });
    } else {
      const result = await stripe.paymentIntents.create({
        customer: user.stripeCustomerId,
        payment_method,
        amount: 2500,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
        confirm: true,
      });

      const { id, amount, created } = result;

      const charge = await Charge.create({
        stripePaymentIntentId: id,
        stripePaymentMethodId: result.payment_method,
        username,
        amount,
      });

      return res.send({ charge });
    }
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." + err });
  }
});

export default router;
