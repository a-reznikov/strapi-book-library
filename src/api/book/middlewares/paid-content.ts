/**
 * `paid-content` middleware
 * 1. Disable policy is-available-content
 * 2. Create middleware
 * 3. Add middleware to routes
 */

import { Strapi } from "@strapi/strapi";
import { isAvailable } from "../helpers";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In paid-content middleware.");

    console.log("Before", ctx.response.status);

    await next();

    if (ctx.response.status !== 200) {
      return;
    }

    const bookId = ctx.request.params.id;
    const userId = ctx.state.user.id;

    if (!userId || !bookId) {
      ctx.throw(400, "The request doesn't contain the required data!");

      return;
    }

    const userBook = await strapi.query("api::user-book.user-book").findOne({
      where: { user: userId, book: bookId },
    });

    if (!userBook || !isAvailable(userBook.availableUntil)) {
      ctx.response.body.data.attributes.content =
        "This content should only be available after payment.";

      return;
    }

    console.log("After", ctx.response.status);
  };
};
