import React, { useEffect, useState } from "react";
import { getComments, addComment, editComment, deleteComment } from "../../../managers/comments/CommentManager";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getComments(postId).then((comments) => setComments(comments));
  }, [postId]);

  const handleOpen = (comment) => {
    setSelectedComment(comment);
    setCommentText(comment.content);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedComment({});
    setCommentText("");
    setOpen(false);
  };

  const handleEditComment = () => {
    editComment(selectedComment.id, commentText)
      .then(() => {
        // Update the comments state with the edited comment
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.id === selectedComment.id ? { ...c, content: commentText } : c
          )
        );

        handleClose();
      })
      .catch((error) => {
        console.error("Error editing comment: ", error);
      });
  };

  const handleDeleteComment = () => {
    deleteComment(selectedComment.id)
      .then(() => {
        // Remove the deleted comment from the comments state
        setComments((prevComments) =>
          prevComments.filter((c) => c.id !== selectedComment.id)
        );

        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  };

  const handleAddComment = () => {
    addComment(postId, commentText)
      .then((newComment) => {
        // Add the new comment to the comments state
        setComments((prevComments) => [...prevComments, newComment]);

        // Clear the comment text field
        setCommentText("");

        handleClose();
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content} by {comment.tourist.user.first_name} {comment.tourist.user.last_name}</p>
          <Button color="secondary" onClick={() => handleOpen(comment)}>Edit</Button>
        </div>
      ))}

      <TextField
        label="Add a Comment"
        variant="outlined"
        color="secondary"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <Button onClick={handleAddComment} variant="contained" color="secondary">
        Add Comment
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit/Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit or delete the comment:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            value={commentText}
            color="secondary"
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditComment} color="secondary">
            Edit
          </Button>
          <Button onClick={handleDeleteComment} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
