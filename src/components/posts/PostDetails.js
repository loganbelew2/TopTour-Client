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
  let user = localStorage.getItem('user')

  useEffect(() => {
    getAllPosts(`/${postId}`).then((res) => setPost(res));
  }, []);

  useEffect(() => {
    getMap(post?.attraction?.coordinates).then((res) => setMap(res));
  }, [post]);

  

  return (
    <div className=" mx-auto flex justify-between items-start pt-10">
      <div className="w-4/6 mx-4">
        <Card>
          <CardContent className="flex flex-col">
            <Typography variant="h6" component="div">
              {post.name}
            </Typography>
            <div className="image-container flex justify-center">
              <img
              className="post-image w-4/6"
              alt={post?.attraction?.name}
              src={post?.attraction?.photo_url}
              />
            </div>
            <Typography variant="h6" component="div">
              {post?.attraction?.name}
            </Typography>
            <h3>Review</h3>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              {post.review}
            </Typography>
          </CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Author:{" "}
            {post?.tourist?.id == user?
                (
                <StyledLink to={`/${post?.tourist?.id}`}>
                  {post?.tourist?.user?.first_name} {post?.tourist?.user?.last_name}
                </StyledLink>)
                :
                (
                <StyledLink to={`/user/${post?.tourist?.id}`}>
                    {post?.tourist?.user?.first_name} {post?.tourist?.user?.last_name}
                </StyledLink>
                )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(post.time_stamp).toLocaleString()}
          </Typography>
        </Card>
        <Typography variant="h6" component="div">Comments</Typography>
        <CommentSection postId = {postId} />
      </div>
      {map.url && (
        <div className="w-2/6 ">
          <img src={map.url} alt="Static Map" />
        </div>
      )}
    </div>
  );
};
