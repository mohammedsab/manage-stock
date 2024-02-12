import express from "express";
import "dotenv/config";
import cors from "cors";
import crypto from "crypto";
import mongoose from "mongoose";
import {
  authorize,
  uninstalled,
  productCreated,
  productLow,
} from "./sallaEvents/index.js";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL);

app.post("/salla/api", (req, res) => {
  const requestHMAC = req.header("x-salla-signature");
  const secret = process.env.WEBHOOK_SECRET;
  const computedHMAC = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  const signatureMatches = requestHMAC === computedHMAC;

  if (!signatureMatches) {
    console.log("--------------------------error------------");
    return res.sendStatus(401);
  }

  console.log("req.body---------", req.body);

  const event = req.body.event;
  switch (event) {
    case "app.store.authorize":
      authorize(req.body);
      break;
    case "app.uninstalled":
      uninstalled(req.body.merchant);
      break;
    case "product.created":
      productCreated(req.body);
      break;
    case "product.quantity.low":
      productLow(req.body);
      break;

    default:
      console.log("=============ok=============");
      break;
  }

  res.status(200).end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server run -> http://localhost:${process.env.PORT}`);
});
