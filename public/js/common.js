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

  $.post("/api/posts", data, (postData, status, xhr) => {
    let html = createPostHtml(postData);
    $(".postContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
  let postedBy = postData.postedBy;
  let displayName = postedBy.firstName + " " + postedBy.lastName;
  let timestamp = postData.createdAt;
  if (postedBy._id === undefined) {
    console.log("User object is not populated");
  }
  return `<div class="posts">

              <div class="mainContainer">
                  <div class="userImageContainer">
                      <img src="${postedBy.profilePic}">
                  </div>
                  <div class="postContentContainer">
                      <div class="header">
                      <a href="/profile/${postedBy.username}">${displayName}</a>
                      <span class="username">@${postedBy.username}</span>
                      <span class="date">${timestamp}</span>

                      </div>
                      <div class="postBody">
                          <span>${postData.content}</span>
                      </div>
                      <div class="postFooter">
                          <div class="postButtonContainer">
                              <button>
                                  <i class="far fa-comment"></i>
                              </button>
                          </div>
                          <div class="postButtonContainer">
                            <button>
                              <i class="fas fa-retweet"></i>
                            </button>
                          </div>
                          <div class="postButtonContainer">
                            <button>
                              <i class="far fa-heart"></i>
                            </button>
                          </div>                      
                      </div>
                  </div>
              </div>

          </div>`;
}
