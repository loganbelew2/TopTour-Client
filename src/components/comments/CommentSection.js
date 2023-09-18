import React, { useEffect, useState } from "react";
import { getCommentsByPost, addComment, editComment, deleteComment } from "../../managers/comments/CommentManager";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    getCommentsByPost(postId).then((comments) => setComments(comments));
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
        setComments((prevComments) => [...prevComments, newComment]);

        setCommentText("");

        handleClose();
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };

  return (
    <div className="comment-section">
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

      <Button
        onClick={() => setShowAllComments(!showAllComments)}
        variant="contained"
        color="secondary"
      >
        {showAllComments ? "Show Top Three Comments" : "Show All Comments"}
      </Button>

      {comments.slice(0, showAllComments ? comments.length : 3).map((comment) => (
        <div key={comment.id}>
          <Typography>{comment.content}</Typography>
          <Typography variant="body2" color="textSecondary"> by {comment.tourist.user.first_name} {comment.tourist.user.last_name}</Typography>
          <Button color="secondary" onClick={() => handleOpen(comment)}>Edit</Button>
        </div>
      ))}

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
