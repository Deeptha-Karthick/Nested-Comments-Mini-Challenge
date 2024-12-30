import "./styles.css";
import Comment from "./Comment";
import { useState } from "react";

export default function App() {
  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Hi how are you ?",
      replies: [{ parentID: 1, id: 11, comment: "Hey I am fine, wau?" }],
    },
  ]);

  const locateElement = (id, newNestedArray) => {
    for (const element of newNestedArray) {
      if (id === element.id) {
        return element;
      }

      if (element.replies) {
        return locateElement(id, element.replies);
      }
    }
  };

  const onAddComment = (reply, parentID) => {
    const newNestedArray = [...comments];
    const locatedElement = locateElement(parentID, newNestedArray);
    if (locatedElement.replies) {
      locatedElement.replies.unshift({ id: Date.now(), comment: reply });
    } else {
      locatedElement["replies"] = [
        { parentID: parentID, id: Date.now(), comment: reply },
      ];
    }

    setComments(newNestedArray);

    //find the element with this id no matter how deeply it is nested it and add this along with date as id at the top
  };

  const onDeleteComment = (parentID, currentID) => {
    const newNestedArray = [...comments];
    //Locate Parent
    if (!parentID) {
      let newArray = newNestedArray.filter((el) => el.id !== currentID);
      setComments(newArray);
      return;
    }
    const parent = locateElement(parentID, newNestedArray);
    if (parent.replies) {
      parent.replies = parent.replies.filter((el) => el.id !== currentID);
      setComments(newNestedArray);
    }
  };

  const renderComments = (comments, level = 0) => {
    return comments.map((el, index) => (
      <div
        className="checkBox"
        key={el.id}
        style={{ paddingLeft: `${level * 15}px` }}
      >
        <Comment
          comment={el}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
        {el.replies && renderComments(el.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Nested Comments Challenge</h1>
      <div className="nested-comments-container">
        {renderComments(comments)}
      </div>
    </div>
  );
}
