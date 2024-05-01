$("#postTextarea, #replyTextarea").keyup((event) => {
  let textbox = $(event.target);
  let value = textbox.val().trim();

  let isModal = textbox.parents(".modal").length == 1;

  const submitButton = isModal
    ? $("#submitReplyButton")
    : $("#submitPostButton");

  if (submitButton.length == 0) {
    return alert("No submit button found");
  }
  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  }
  submitButton.prop("disabled", false);
});

// document
//   .querySelector(".textareaContainer textarea ")
//   .addEventListener("input", function () {
//     document.querySelector("#submitPostButton").disabled =
//       this.value.trim() === "" ? true : false;
//   });

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
//LIKES
$(document).on("click", ".likeButton", (event) => {
  let button = $(event.target);
  let postId = getPostIdfromElement(button);

  if (postId === undefined) return;

  $.ajax({
    url: `/api/posts/${postId}/like`,
    type: "PUT",
    success: (postData) => {
      button.find("span").text(postData.likes.length || "");

      if (postData.likes.includes(userLoggedIn._id)) {
        button.addClass("active");
      } else {
        button.removeClass("active");
      }
    },
  });
});

$("#replyModal").on("show.bs.modal", (event) => {
  let button = $(event.relatedTarget);
  let postId = getPostIdfromElement(button);

  $.get("api/posts/" + postId, function (results) {
    console.log(results);
  });
});

//RETWEET
$(document).on("click", ".retweetButton", (event) => {
  let button = $(event.target);
  let postId = getPostIdfromElement(button);

  if (postId === undefined) return;

  $.ajax({
    url: `/api/posts/${postId}/retweet`,
    type: "POST",
    success: (postData) => {
      button.find("span").text(postData.retweetUsers.length || "");

      if (postData.retweetUsers.includes(userLoggedIn._id)) {
        button.addClass("active");
      } else {
        button.removeClass("active");
      }
    },
  });
});

function getPostIdfromElement(element) {
  let isRoot = element.hasClass("posts");
  let rootElement = isRoot ? element : element.closest(".posts");
  let postId = rootElement.data("id");

  if (postId === undefined) {
    return alert("Post id undefined");
  }

  return postId;
}

function createPostHtml(postData) {
  if (postData == null) return alert("post object is null");

  let isRetweet = postData.retweetData !== undefined;
  let retweetedBy = isRetweet ? postData.postedBy.username : null;

  postData = isRetweet ? postData.retweetData : postData;

  let postedBy = postData.postedBy;
  let displayName = postedBy.firstName + " " + postedBy.lastName;

  if (postedBy._id === undefined) {
    console.log("User object is not populated");
  }
  // Calculate time difference
  let currentTime = new Date();
  let postTime = new Date(postData.createdAt);
  let timeDifference = Math.abs(currentTime - postTime);
  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  let timestamp = "";
  if (days > 0) {
    timestamp = `${days} days ago`;
  } else if (hours > 0) {
    timestamp = `${hours} hours ago`;
  } else if (minutes > 0) {
    timestamp = `${minutes} minutes ago`;
  } else {
    timestamp = `Just now`;
  }

  let likeButtonInitialActiveClass = postData.likes.includes(userLoggedIn._id)
    ? "active"
    : "";

  let retweetButtonInitialActiveClass = postData.retweetUsers.includes(
    userLoggedIn._id
  )
    ? "active"
    : "";

  let retweetText = "";
  if (isRetweet) {
    retweetText = `<span>Retweeted by <a href='profile/${retweetedBy}'> @${retweetedBy}</a></span>`;
  }
  return `<div class="posts" data-id="${postData._id}">
              <div class="postActionContainer">${retweetText}</div>
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
                              <button data-bs-toggle="modal" data-bs-target="#replyModal">
                                  <i class="far fa-comment"></i>
                              </button>
                          </div>
                          <div class="postButtonContainer green">
                            <button class="retweetButton ${retweetButtonInitialActiveClass}">
                              <i class="fas fa-retweet"></i>
                              <span>${postData.retweetUsers.length || ""}</span>
                            </button>
                          </div>
                          <div class="postButtonContainer red">
                            <button class="likeButton ${likeButtonInitialActiveClass}">
                              <i class="far fa-heart"></i>
                              <span>${postData.likes.length || ""}</span>
                            </button>
                          </div>                      
                      </div>
                  </div>
              </div>

          </div>`;
}
