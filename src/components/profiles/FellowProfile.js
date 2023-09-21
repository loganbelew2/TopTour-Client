import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTouristById } from "../../managers/tourists/TouristManager";
import { getPostsByUser } from "../../managers/posts/PostManager";
import { Snackbar } from "@mui/material";

export const FellowProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTouristById(userId)
      .then((res) => {
        setUser(res);

        getPostsByUser(res.id).then((userPosts) => {
          setPosts(userPosts);
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  return userId !== localStorage.getItem('user') ? (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Top Section (Profile Information) */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{user?.user?.username}</h1>
          <img
            className="w-24 h-24 rounded-full mx-auto mt-4"
            src={user.profile_image}
            alt={`${user?.user?.username}'s Profile Picture`}
          />
          <p className="text-gray-600 mt-4">{user.bio}</p>
        </div>

        {/* Bottom Section (User's Posts) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">User's Posts</h2>
          <ul className="list-disc list-inside mt-4">
            {posts.map((post) => (
              <li key={post.id}>{post.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={true}
      message="Nice try buddy"
    ></Snackbar>
  );
};
