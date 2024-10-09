export default {
  routes: [
    {
      method: "GET",
      path: "/books/:id/chapter/:chapterId",
      handler: "book.findChapter",
      config: {
        policies: ["api::book.is-available-content"],
      },
    },
  ],
};
