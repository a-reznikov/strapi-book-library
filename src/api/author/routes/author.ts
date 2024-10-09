/**
 * author router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::author.author", {
  config: {
    findOne: {
      middlewares: [
        "api::author.middleware-first",
        "api::author.middleware-second",
      ],
    },
  },
});
