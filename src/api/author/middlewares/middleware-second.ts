/**
 * `middleware-second` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log("Before Middleware 2"); // Executed second

    ctx.sequence.push("Before Middleware 2");

    await next(); // Control passes to Middleware 3

    console.log("After Middleware 2");

    ctx.sequence.push("After Middleware 2");
  };
};
