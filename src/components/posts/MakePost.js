import React, { useEffect, useState } from "react";
import { createPost } from "../../managers/posts/PostManager";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAllCategories } from "../../managers/categories/CategoryManager";
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import { editAttraction, getLastAttraction } from "../../managers/attractions/AttractionManager";
import { getPhoto } from "../../managers/googleApi/PhotoManager";

export const MakePost = () => {
    const [categories, setCategories] = useState([]);
    const [attractionName, setAttractionName] = useState({})
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [isSnackbarOpen, setSnackBarOpen] = useState(false)
    const [attraction, setAttractionId] = useState(0)
    useEffect(() => {
        getAllCategories().then((res) => setCategories(res));
        getLastAttraction().then(res => {setAttractionName(res.name); setAttractionId(res.id)})
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            attraction, 
            category,
            name,
            review,
        };

        createPost(newPost).then((res) => {
            setSnackBarOpen(true);
            getPhoto(res.attraction.photo_url).then(url => {
                editAttraction(res.attraction.id, url)
            })
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
                    value={attractionName}
                    readOnly 
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
                    label="name of post"
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
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                message="Post has been created."
            />
        </>
    );
};
