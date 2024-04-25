$(document).ready(() => {
  $.get("api/posts", function (results) {
    outputPosts(results, $(".postsContainer"));
  });
});
function outputPosts(results, container) {
  container.html("");
  results.forEach((result) => {
    var html = createPostHtml(result);
    container.append(html);
  });
  if (results.length == 0) {
    container.append("<span>There is nothing to show here. </span>");
  }
}
