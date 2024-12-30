import { useState, useRef } from "react";
const Comment = ({ comment, onAddComment, onDeleteComment }) => {
  console.log("comment", comment);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const replyRef = useRef("");

  const onReplyClick = () => {
    setShowReplyBox(true);
  };

  const onCancelClick = () => {
    replyRef.current = "";
    setShowReplyBox(false);
  };

  const onAddClick = () => {
    onAddComment(replyRef.current.value, comment.id);
    replyRef.current.value = "";
    setShowReplyBox(false);
  };
  return (
    <div className="outer-cover">
      <div className="individual-comment">
        <div className="avatar"> </div>
        <div className="comment-text"> {comment.comment} </div>
      </div>
      <div className="actions">
        {showReplyBox ? (
          <>
            <input type="text" placeholder="Reply...." ref={replyRef} />
            <button onClick={onAddClick}> Add </button>
            <button onClick={onCancelClick}> Cancel</button>
          </>
        ) : (
          <>
            <button className="action" onClick={onReplyClick}>
              Reply
            </button>
            <button
              className="action"
              onClick={() => onDeleteComment(comment.parentID, comment.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
