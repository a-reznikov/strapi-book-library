/**
 * user-book router
 */

import { factories } from "@strapi/strapi";

// export default factories.createCoreRouter("api::user-book.user-book");

//? Policy HMAC

export default factories.createCoreRouter("api::user-book.user-book", {
  config: {
    create: {
      policies: ["api::user-book.is-payment-webhook"],
    },
  },
});
