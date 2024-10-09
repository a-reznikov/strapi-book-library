/**
 * book controller
 * 1. Create controller findChapter
 * 2. Create route for custom controller
 * 3. Create service findBook
 * 4. Apply policy is-available-content to custom route
 */

import { factories } from "@strapi/strapi";
import { getContent } from "../helpers";

export default factories.createCoreController(
  "api::book.book",
  ({ strapi }) => ({
    async find(ctx) {
      // validateQuery throws an error if any of the query params used are inaccessible to ctx.user
      // trying to access private fields, fields they don't have permission for, wrong data type, etc
      await this.validateQuery(ctx);

      // sanitizeQuery silently removes any query params that are invalid or the user does not have access to
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      // Perform whatever custom actions are needed
      const { results, pagination } = await strapi
        .service("api::book.book")
        .find(sanitizedQueryParams);

      // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      // transformResponse correctly formats the data and meta fields of your results to return to the API
      return this.transformResponse(sanitizedResults, { pagination });
    },

    async findChapter(ctx) {
      const chapterId = +ctx.request.params.chapterId;

      const book = await strapi.service("api::book.book").findBook();

      const content = getContent(chapterId, book.content);

      if (!content.length) {
        ctx.throw(404, "Chapter not found");

        return;
      }

      return content;
    },
  })
);

// import { factories } from "@strapi/strapi";

// export default factories.createCoreController(
//   "api::book.book",
//   ({ strapi }) => ({
//     async find(ctx) {
//       // validateQuery throws an error if any of the query params used are inaccessible to ctx.user
//       // trying to access private fields, fields they don't have permission for, wrong data type, etc
//       await this.validateQuery(ctx);

//       // sanitizeQuery silently removes any query params that are invalid or the user does not have access to
//       const sanitizedQueryParams = await this.sanitizeQuery(ctx);

//       // Perform whatever custom actions are needed
//       const { results, pagination } = await strapi
//         .service("api::book.book")
//         .find(sanitizedQueryParams);

//       // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
//       const sanitizedResults = await this.sanitizeOutput(results, ctx);

//       // transformResponse correctly formats the data and meta fields of your results to return to the API
//       return this.transformResponse(sanitizedResults, { pagination });
//     },
//   })
// );
