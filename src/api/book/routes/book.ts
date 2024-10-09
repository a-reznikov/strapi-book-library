/**
 * book router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::book.book", {
  config: {
    findOne: {
      middlewares: ["api::book.paid-content", "api::book.chapter-count"],
      // policies: ["api::book.is-available-content"],
    },
  },
});
