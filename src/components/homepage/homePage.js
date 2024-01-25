import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/posts/PostManager";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { HomePageFilters } from "./homePageFilters";

export const HomePage = ({StyledLink}) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([])
  const [searchString, setSearchString] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isFilterOn, setFilterOn] = useState(false)
  const [isSearchON, setIsSearchOn] = useState(false)
  let user = localStorage.getItem('user')

  useEffect(() => {
    getAllPosts().then((res) => {setPosts(res)});
  }, []);

  useEffect(() => {
    const uniqueCategories = [...new Set(posts.map((post) =>  post.category.name))];
    setCategories(uniqueCategories);
}, [posts]);

  return (
    <div className="container mx-auto pt-10">
      <HomePageFilters searchString={searchString} setSearchString={setSearchString} selectedCategory={selectedCategory}
       setSelectedCategory={setSelectedCategory} setFilterOn={setFilterOn} setIsSearchOn={setIsSearchOn} categories={categories}/>
      <Grid container spacing={3}>
        {posts.map((post) => (
          (isFilterOn && post.category.name === selectedCategory) ||
          (!isFilterOn && !isSearchON) ||
          (isSearchON && post.attraction.name.toLowerCase().includes(searchString.toLowerCase())) ? (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <div className=" container h-full flex flex-col justify-between shadow-md shadow-emerald-800">
              <CardContent className="flex flex-col h-full justify-evenly">
                <Typography variant="h6" className="truncate" component="div">
                    <StyledLink to={`/post/${post.id}`}>
                        {post.name}
                    </StyledLink> 
                </Typography>
                <CardMedia
                  className="flex self-center max-w-xs max-h-52 grow "
                  component="img"
                  alt={post.attraction.name}
                  src={post.attraction.photo_url}
                />
                <Typography variant="h6" component="div">
                  {post.attraction.name}
                </Typography>
                <div>
                  <Typography className="inline pr-1" variant="subtitle2">
                    Review:
                  </Typography>
                  <Typography className=" truncate " variant="body2" color="textSecondary">
                    {post.review}
                  </Typography>
                </div>
              </CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Author:{" "}
                {post.tourist.id == user?
                (
                <StyledLink to={`/${post.tourist.id}`}>
                  {post.tourist.user.first_name} {post.tourist.user.last_name}
                </StyledLink>)
                :
                (
                <StyledLink to={`/user/${post.tourist.id}`}>
                    {post.tourist.user.first_name} {post.tourist.user.last_name}
                </StyledLink>
                )}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(post.time_stamp).toDateString()}
              </Typography>
            </div>
          </Grid>): null
        ))}
      </Grid>
    </div>
  );
};
