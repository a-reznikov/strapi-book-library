/**
 * book service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::book.book", ({ strapi }) => ({
  async findBook() {
    const ctx = strapi.requestContext.get();

    const book = await strapi.entityService.findOne(
      "api::book.book",
      ctx.request.params.id,
      ctx.query
    );

    if (!book) {
      ctx.throw(404, "Book not found");

      return;
    }

    return book;
  },
}));
