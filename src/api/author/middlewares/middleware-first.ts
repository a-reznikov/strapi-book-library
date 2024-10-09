/**
 * `middleware-first` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log("Before Middleware 1"); // Executed first

    ctx.sequence = ["Before Middleware 1"];

    await next(); // Control passes to Middleware 2

    console.log("After Middleware 1");

    ctx.sequence.push("After Middleware 1");

    ctx.response.body.meta = {
      ...ctx.response.body.meta,
      sequence: ctx.sequence,
    };
  };
};
