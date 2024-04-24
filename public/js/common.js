// $("#postTextarea").keyup((event) => {
//   var textbox = $(event.target);
//   var value = textbox.val().trim();

//   const submitButton = $("#submitPostButton");

//   if (submitButton.length == 0) {
//     return alert("No submit button found");
//   }
//   if (value == "") {
//     submitButton.prop("disabled", true);
//     return;
//   }
//   submitButton.prop("disabled", false);
// });

document
  .querySelector(".textareaContainer textarea")
  .addEventListener("input", function () {
    document.querySelector("#submitPostButton").disabled =
      this.value.trim() === "" ? true : false;
  });

$("#submitPostButton").click((event) => {
  const button = $(event.target);
  const textbox = $("#postTextarea");

  let data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData, status, xhr) => {});
});
