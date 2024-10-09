/**
 * user-book controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-book.user-book",
  ({ strapi }) => ({
    //? Step 1. Extend
    // async create(ctx) {
    //   const { subscriptionDays, user } = ctx.request.body.data;

    //   const currentDate = new Date();
    //   const availableUntilDate = new Date().setDate(
    //     currentDate.getDate() + subscriptionDays
    //   );

    //   ctx.request.body.data.purchaseDate = currentDate;
    //   ctx.request.body.data.availableUntil = availableUntilDate;
    //   ctx.request.body.data.user = user;

    //   const response = await super.create(ctx); //! With sanitization
    //   return response;
    // },

    //? Step 2. Override
    async create(ctx) {
      const { subscriptionDays, user } = ctx.request.body.data;

      const currentDate = new Date();
      const availableUntilDate = new Date().setDate(
        currentDate.getDate() + subscriptionDays
      );

      return this.transformResponse(
        await strapi.entityService.create("api::user-book.user-book", {
          data: {
            ...ctx.request.body.data,
            user,
            purchaseDate: currentDate,
            availableUntil: availableUntilDate,
          },
        })
      );
    },

    async customHandler(ctx) {
      console.log("customHandler");

      return { route: ctx.state.route };
    },
  })
);
