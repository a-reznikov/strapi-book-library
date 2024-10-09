/**
 * is-available-content policy
 * 1. Create policy
 * 2. Add to routes
 */

import { isAvailable } from "../helpers";

export default async (policyContext, config, { strapi }) => {
  strapi.log.info("In is-available-content policy.");

  const bookId = policyContext.request.params.id;
  const userId = policyContext.state.user.id;

  if (userId && bookId) {
    const userBook = await strapi.query("api::user-book.user-book").findOne({
      where: { user: userId, book: bookId },
    });

    if (userBook && isAvailable(userBook.availableUntil)) {
      return true;
    }
  }

  return false;
};
