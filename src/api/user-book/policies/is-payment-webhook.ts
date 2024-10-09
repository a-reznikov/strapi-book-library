/**
 * is-payment-webhook policy
 * https://docs-v4.strapi.io/dev-docs/backend-customization/policies
 * https://emn178.github.io/online-tools/sha256.html
 *
 * 1. npm run generate
 * 2. generate HMAC (body, PAYMENT_WEBHOOKS_KEY)
 * 3. set header in Postman
 * 3. update global middleware { name: "strapi::body", config: { includeUnparsed: true } },
 * 4. Add policy to routers
 */

import crypto from "crypto";
import unparsed from "koa-body/unparsed.js";

export default (policyContext, config, { strapi }) => {
  const ctx = strapi.requestContext.get();

  const generatedHash = crypto
    .createHmac("sha256", process.env.PAYMENT_WEBHOOK_KEY)
    .update(ctx.request.body[unparsed], "utf8")
    .digest("base64");

  console.log("generatedHash", generatedHash);
  console.log("HeaderHash", ctx.request.header["x-payment-hmac-sha256"]);

  if (generatedHash === ctx.request.header["x-payment-hmac-sha256"]) {
    return true;
  }

  return false;
};
