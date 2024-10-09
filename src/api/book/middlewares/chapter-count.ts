/**
 * `chapter-count` middleware
 * 1. Create middleware
 * 2. Add to routes
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In chapter-count middleware.");

    await next();

    if (ctx.response.status !== 200) {
      return;
    }

    const body = ctx.response.body;
    const { id } = ctx.request.params;

    const count = await strapi.db.connection.raw(
      `SELECT COUNT (*) AS chapter_count
        FROM books_components
        WHERE component_type='common.chapter' AND entity_id=${id}`
    );

    body.meta.chapterCount = +count[0].chapter_count;
  };
};
