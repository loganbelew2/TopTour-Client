import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../../managers/posts/PostManager";
import { getMap } from "../../managers/MapManager";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CommentSection } from "../comments/CommentSection";



export const PostDetails = ({ StyledLink }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [map, setMap] = useState({});


  useEffect(() => {
    getAllPosts(`/${postId}`).then((res) => setPost(res));
  }, []);

  useEffect(() => {
    getMap(post?.attraction?.coordinates).then((res) => setMap(res));
  }, [post]);

  

  return (
    <div className="flex justify-between items-start pt-14">
      <div className="w-4/6 mr-4">
        <Card>
          <CardContent className="flex flex-col">
            <Typography variant="h4" component="div">
              <StyledLink to={`/post/${post.id}`}>{post.name}</StyledLink>
            </Typography>
            <CardMedia
              component="img"
              alt={post?.attraction?.name}
              src={post?.attraction?.photo_url}
            />
            <Typography variant="h6" component="div">
              {post?.attraction?.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Author:{" "}
              <StyledLink to={`/${post.tourist?.user?.id}`}>
                {post.tourist?.user?.first_name} {post.tourist?.user?.last_name}
              </StyledLink>
            </Typography>
            <h3>Review</h3>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              {post.review}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(post.time_stamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
        <Typography variant="h6" component="div">Comments</Typography>
        <CommentSection postId = {postId} />
      </div>
      {map.url && (
        <div className="w-2/6 mt-10">
          <img src={map.url} alt="Static Map" />
        </div>
      )}
    </div>
  );
};
