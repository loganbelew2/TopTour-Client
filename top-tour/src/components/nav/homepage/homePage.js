import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../../managers/PostManager";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: "#19857b",
    "&:hover": {
      color: "#90CAF9",
    },
  }));

export const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card className="h-full">
              <CardMedia
                component="img"
                height="200"
                alt={post.attraction.name}
                src={post.attraction.photo_url}
              />
              <CardContent className="flex flex-col">
                <Typography variant="h4" component="div">
                  {post.name}
                </Typography>
                <Typography variant="h6" component="div">
                  {post.attraction.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Author: <StyledLink> {post.tourist.user.first_name} {post.tourist.user.last_name}</StyledLink> 
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={2}>
                  {post.review}
                </Typography>
                <Typography variant="body2" color="textSecondary" >
                    {post.time_stamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};


