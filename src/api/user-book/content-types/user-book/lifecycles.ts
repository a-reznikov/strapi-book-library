// export default {
//   beforeCreate(event) {
//     const { data, where, select, populate } = event.params;
//     const ctx = strapi.requestContext.get();

//     const { subscriptionDays, user } = ctx.request.body.data;

//     const currentDate = new Date();
//     const availableUntilDate = new Date().setDate(
//       currentDate.getDate() + subscriptionDays
//     );

//     data.purchaseDate = currentDate;
//     data.availableUntil = availableUntilDate;
//     data.user = user;
//   },
// };
