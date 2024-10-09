import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('country-dropdown')
      .service('myService')
      .getWelcomeMessage();
  },
});
