fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const commentsList = data.comments;
    console.log(commentsList);

    comments = commentsList.map((comment) => {
      console.log(comment.content);
      return {
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        username: comment.user.username,
        avatar: comment.user.image.png,
      };
    });
    console.log(comments);
    renderCommentsList(comments);
  });

const createComment = (comment) => {
  // CREATE ELEMENTS

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

  return commentWrapper;
};

const renderCommentsList = (comments) => {
  const commentsSection = document.querySelector(".comments");

  comments.forEach((comment) => {
    commentsSection.appendChild(createComment(comment));
  });

  return commentsSection;
};
