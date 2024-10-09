export default {
  routes: [
    {
      method: "GET",
      path: "/test/custom-endpoint",
      handler: "user-book.customHandler",
    },
  ],
};
