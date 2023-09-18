import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourists } from "../../managers/tourists/TouristManager";
import { getPostsByUser, deletePost } from "../../managers/posts/PostManager";
import { getCommentsByUser, editComment, deleteComment } from "../../managers/comments/CommentManager";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [openEditCommentDialog, setOpenEditCommentDialog] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        getTourists(userId)
            .then((res) => {
                setUser(res);

                getPostsByUser(res.id).then((userPosts) => {
                    setPosts(userPosts);
                });

                getCommentsByUser(res.id).then((userComments) => {
                    setComments(userComments);
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [userId]);

    const handleEditComment = (comment) => {
        setSelectedComment(comment);
        setEditCommentText(comment.content);
        setOpenEditCommentDialog(true);
    };

    const handleEditCommentSave = () => {
        editComment(selectedComment.id, editCommentText)
            .then(() => {
                // Update the comments state with the edited comment
                setComments((prevComments) =>
                    prevComments.map((c) =>
                        c.id === selectedComment.id
                            ? { ...c, content: editCommentText }
                            : c
                    )
                );

                setOpenEditCommentDialog(false);
            })
            .catch((error) => {
                console.error("Error editing comment: ", error);
            });
    };

    const handleDeleteComment = (comment) => {
        deleteComment(comment.id)
            .then(() => {
                // Remove the deleted comment from the comments state
                setComments((prevComments) =>
                    prevComments.filter((c) => c.id !== comment.id)
                );
            })
            .catch((error) => {
                console.error("Error deleting comment: ", error);
            });
    };

    const handleDeletePost = (post) => {
        deletePost(post.id)
            .then(() => {
                // Remove the deleted post from the posts state
                setPosts((prevPosts) =>
                    prevPosts.filter((p) => p.id !== post.id)
                );
            })
            .catch((error) => {
                console.error("Error deleting post: ", error);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Top Section (Profile Information) */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        {user?.user?.username}
                    </h1>
                    <img
                        className="w-24 h-24 rounded-full mx-auto mt-4"
                        src={user.profile_image}
                        alt={`${user?.user?.username}'s Profile Picture`}
                    />
                    <p className="text-gray-600 mt-4">{user.bio}</p>
                </div>

                {/* Bottom Section (User's Posts and Comments) */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                    {/* User's Posts */}
                    <div className="col-span-1">
                        <h2 className="text-xl font-semibold">User's Posts</h2>
                        <ul className="list-disc list-inside mt-4">
                            {posts.map((post) => (
                                <li key={post.id}>
                                    {post.name}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate(`/editPost/${post.id}`)}
                                        className="ml-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeletePost(post)}
                                        className="ml-2"
                                    >
                                        Delete
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User's Comments */}
                    <div className="col-span-1">
                        <h2 className="text-xl font-semibold">User's Comments</h2>
                        <ul className="list-disc list-inside mt-4">
                            {comments.map((comment) => (
                                <li key={comment.id}>
                                    {comment.content}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditComment(comment)}
                                        className="ml-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteComment(comment)}
                                        className="ml-2"
                                    >
                                        Delete
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Edit Comment Dialog */}
            <Dialog
                open={openEditCommentDialog}
                onClose={() => setOpenEditCommentDialog(false)}
            >
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="editComment"
                        label="Edit Comment"
                        type="text"
                        fullWidth
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditCommentDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditCommentSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
