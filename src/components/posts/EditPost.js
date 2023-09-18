import React, { useEffect, useState } from "react";
import { getAllPosts, updatePost } from "../../managers/posts/PostManager";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAllCategories } from "../../managers/categories/CategoryManager";
import { Dialog, FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";

export const EditPostForm = () => {
    const [post, setPost] = useState({});
    const { postId } = useParams();
    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [isSubmiited, setSubmitted] = useState(false)
    const [isSnackbarOpen, setSnackBarOpen] = useState(false)
    useEffect(() => {
        getAllCategories().then((res) => setCategories(res));
    }, []);

    useEffect(() => {
        getAllPosts(`/${postId}`).then((res) => {
            setPost(res);
            // Populate the state variables with post values
            setCategory(res.category?.id || "");
            setName(res.name || "");
            setReview(res.review || "");
        });
    }, [postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Access the updated values from the state variables
        const editedPost = {
            attraction: post.attraction.id, // Use the existing attraction name
            category,
            name,
            review,
        };

        updatePost(postId, editedPost).then(() => {
            setSnackBarOpen(true)
            setSubmitted(prev => !prev)
        })

   
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
            }
            // Close the Snackbar
        setSnackBarOpen(false);
        };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <TextField
                    label="Attraction"
                    variant="outlined"
                    fullWidth
                    value={post?.attraction?.name} // Display the existing attraction name
                    readOnly // Make it read-only
                    color="secondary"
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        color="secondary"
                        autoFocus
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    color="secondary"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    color="secondary"
                    label="Review"
                    variant="outlined"
                    fullWidth
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>
        
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={isSnackbarOpen}
                autoHideDuration={3000} // Adjust as needed
                onClose={handleSnackbarClose}
                message="Post has been updated."
            />
        </>
    );
};
