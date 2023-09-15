import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourists } from "../../managers/tourists/TouristManager";
import { getAllPosts } from "../../managers/posts/PostManager";

export const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getTourists(userId).then((res) => setUser(res));
    }, [userId]);
    useEffect(() => {
        getAllPosts(user)
    },[user])

    // return (
    //     <div className="bg-gray-100 min-h-screen p-8">
    //         <div className="bg-white p-6 rounded-lg shadow-lg">
    //             {/* Top Section (Profile Information) */}
    //             <div className="text-center">
    //                 {/* user.user.username*/}
    //                 <h1 className="text-2xl font-semibold">{user.user.username}</h1>
    //                 {/* Round Profile Picture */}
    //                 <img
    //                     className="w-24 h-24 rounded-full mx-auto mt-4"
    //                     src={user.profile_image}
    //                     alt={`${user.user.username}'s Profile Picture`}
    //                 />
    //                 {/* User's Bio */}
    //                 <p className="text-gray-600 mt-4">{user.bio}</p>
    //             </div>

    //             {/* Bottom Section (User's Posts and Comments) */}
    //             <div className="mt-8 grid grid-cols-2 gap-6">
    //                 {/* User's Posts */}
    //                 <div className="col-span-1">
    //                     <h2 className="text-xl font-semibold">User's Posts</h2>
    //                     <ul className="list-disc list-inside mt-4">
    //                         {/* Map through user's posts and render them */}
    //                         {user.posts.map((post) => (
    //                             <li key={post.id}>{post.title}</li>
    //                         ))}
    //                     </ul>
    //                 </div>

    //                 {/* User's Comments */}
    //                 <div className="col-span-1">
    //                     <h2 className="text-xl font-semibold">User's Comments</h2>
    //                     <ul className="list-disc list-inside mt-4">
    //                         {/* Map through user's comments and render them */}
    //                         {user.comments.map((comment) => (
    //                             <li key={comment.id}>{comment.content}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};
