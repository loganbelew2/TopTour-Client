import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/posts/PostManager";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const HomePage = ({StyledLink}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((res) => {setPosts(res)});
  }, []);

 
  return (
    <div className="container mx-auto p-4 pt-14">
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card className="h-full">
              <CardContent className="flex flex-col">
                <Typography variant="h4" component="div">
                    <StyledLink to={`/post/${post.id}`}>
                        {post.name}
                    </StyledLink> 
                </Typography>
                <CardMedia
                  component="img"
                  height="200"
                  alt={post.attraction.name}
                  src={post.attraction.photo_url}
                />
                <Typography variant="h6" component="div">
                  {post.attraction.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Author:{" "}
                  <StyledLink to={`/${post.tourist.id}`}>
                    {post.tourist.user.first_name} {post.tourist.user.last_name}
                  </StyledLink>
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={2}>
                  {post.review}
                </Typography>
              </CardContent>
              <Typography variant="body2" color="textSecondary" className="ml-2 mb-2">
                {new Date(post.time_stamp).toLocaleString()}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
