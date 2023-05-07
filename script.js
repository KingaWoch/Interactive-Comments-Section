fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    const commentsList = data.comments;
    //console.log(commentsList);

    comments = commentsList.map((comment) => {
      //console.log(comment.content);
      console.log(comment.replies[0]);
      return {
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        username: comment.user.username,
        avatar: comment.user.image.png,
        replies: comment.replies,
      };
    });

    const currentUser = data.currentUser;
    console.log(currentUser.image.png);

    //console.log(comments);
    renderCommentsList(comments, currentUser);
  });

const createComment = (comment) => {
  // CREATE ELEMENTS

  const commentReplyWrapper = document.createElement("div");
  commentReplyWrapper.classList.add("comment-and-reply-wrapper");

  const commentWrapper = document.createElement("div");
  commentWrapper.classList.add("comment-wrapper");

  const commentContent = document.createElement("div");
  commentContent.classList.add("comment");

  const commentUser = document.createElement("div");
  commentUser.classList.add("comment_user");

  const commentAvatar = document.createElement("a");
  commentAvatar.href = "#";
  commentAvatar.classList.add("comment_avatar");

  const avatarImg = document.createElement("img");
  avatarImg.src = comment.avatar;

  const commentUserName = document.createElement("a");
  commentUserName.href = "#";
  commentUserName.classList.add("comment_username");
  commentUserName.innerText = comment.username;

  const createdAt = document.createElement("span");
  createdAt.classList.add("created-at");

  createdAt.innerText = comment.createdAt;

  const commentText = document.createElement("p");
  commentText.classList.add("comment_text");
  commentText.innerText = comment.content;

  const commentButtons = document.createElement("div");
  commentButtons.classList.add("comment_buttons");

  commentButtons.innerHTML = `
       <div class="score">
         <button class="plus">+</button><span     class="score_value">${comment.score}</span>
         <button class="minus">-</button>
      </div>
      <button class="reply-btn">
        <img src="images/icon-reply.svg" alt="Reply" /> Reply
      </button>
  `;

  // APPEND

  commentAvatar.appendChild(avatarImg);

  commentUser.append(commentAvatar, commentUserName, createdAt);

  commentContent.append(commentUser, commentText);

  commentWrapper.append(commentContent, commentButtons);

  commentReplyWrapper.appendChild(commentWrapper);

  // SCORE

  const scoreValue = commentReplyWrapper.querySelector(".score_value");

  const plusBtn = commentReplyWrapper.querySelector(".plus");
  plusBtn.addEventListener("click", () => {
    scoreValue.innerText = comment.score++;
  });

  const minusBtn = commentReplyWrapper.querySelector(".minus");
  minusBtn.addEventListener("click", () => {
    if (comment.score < 0) {
      comment.score === 0;
    } else {
      scoreValue.innerText = comment.score--;
    }
  });

  return commentReplyWrapper;
};

const renderCommentsList = (comments, currentUser) => {
  const commentsSection = document.querySelector(".comments");

  comments.forEach((comment) => {
    commentsSection.appendChild(createComment(comment));
  });

  commentsSection.appendChild(createCurrentUser(currentUser));

  return commentsSection;
};

const createCurrentUser = (currentUser) => {
  const currentUserWrapper = document.createElement("div");
  currentUserWrapper.classList.add("current-user-wrapper");

  const currentUserAvatar = document.createElement("img");
  currentUserAvatar.classList.add("current-user-avatar");
  console.log(currentUser.image);
  currentUserAvatar.src = currentUser.image.png;

  const textarea = document.createElement("textarea");
  textarea.type = "text";
  textarea.placeholder = "Add a comment...";
  textarea.classList.add("current-user-comment");

  const sendBtn = document.createElement("button");
  sendBtn.classList.add("send-btn");
  sendBtn.innerText = "SEND";

  currentUserWrapper.append(currentUserAvatar, textarea, sendBtn);

  return currentUserWrapper;
};
