import { Strapi } from "@strapi/strapi";
// * https://docs-v4.strapi.io/dev-docs/custom-fields

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "country",
    plugin: "country-dropdown",
    type: "string",
    inputSize: {
      default: 4,
      isResizable: true,
    },
  });
};
