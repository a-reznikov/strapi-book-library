/**
 * user-book service
 */

import { factories } from "@strapi/strapi";

// export default factories.createCoreService(
//   "api::user-book.user-book"
// );

export default factories.createCoreService(
  "api::user-book.user-book",
  ({ strapi }) => ({
    async createEntity(purchaseDate: Date, availableUntil: Date) {
      const ctx = strapi.requestContext.get();

      return strapi.entityService.create("api::user-book.user-book", {
        data: {
          ...ctx.request.body.data,
          user: ctx.state.user.id,
          purchaseDate,
          availableUntil,
        },
      });
    },
  })
);
