import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.customFields.register({
      name: "country",
      plugin: "country-dropdown",
      type: "string",
      inputSize: {
        default: 4,
        isResizable: true,
      },
      intlLabel: {
        id: "country-dropdown.country.label",
        defaultMessage: "Country Dropdown",
      },
      intlDescription: {
        id: "country-dropdown.country.description",
        defaultMessage:
          "The custom field to set the relationship between Tasks and Chapters.",
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "dropdown-component" */ "./components/Input"
          ),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "country-dropdown.country.label",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "country-dropdown.country.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
