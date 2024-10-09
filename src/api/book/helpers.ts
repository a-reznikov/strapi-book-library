import { Component } from "./types";

export const isAvailable = (availableUntil: string) => {
  const currentDate = new Date();
  const availableUntilDate = new Date(availableUntil);

  return availableUntilDate > currentDate;
};

export const getContent = (
  contentId: number,
  components: Component[],
  componentName = "common.chapter"
) => {
  let isContent = false;
  const foundContent: Component[] = [];

  for (let i = 0; i < components.length; i++) {
    if (components[i].__component === componentName) {
      if (components[i].id === contentId) {
        isContent = true;
      } else if (isContent) {
        break;
      }
    }

    if (isContent) {
      foundContent.push(components[i]);
    }
  }

  return foundContent;
};
