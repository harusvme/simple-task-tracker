import { useState, useRef, useEffect } from "react";
import Action from "../../actions/Action";
import { ReactComponent as DownArrow } from "../../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../assets/up-arrow.svg";
import styles from "./Comment.module.scss";

const Comment = ({
  handleShowNode,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  const onShowComment = () => {
    setExpand(!expand);
  };
  return (
    <div>
      <div
        className={
          comment.id === 1 ? styles.inputContainer : styles.commentContainer
        }
      >
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className={`${styles.inputContainer__input} ${styles.first_input}`}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Action
              className={`${styles.reply} ${styles.comment}`}
              type="Добавить"
              handleClick={onAddComment}
            />
            <Action
              className={`${styles.reply} ${styles.comment}`}
              type="Развернуть"
              handleClick={onShowComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className={styles.reply}
                    type="Сохранить"
                    handleClick={onAddComment}
                  />
                  <Action
                    className={styles.reply}
                    type="Отмена"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className={styles.reply}
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        Ответ
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className={styles.reply}
                    type="Редактировать"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className={styles.reply}
                    type="Удалить"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputContainer__input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              className={styles.reply}
              type="Ответ"
              handleClick={onAddComment}
            />
            <Action
              className={styles.reply}
              type="Отмена"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleShowNode={handleShowNode}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
