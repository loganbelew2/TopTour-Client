import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllPosts } from "../../../managers/PostManager"
import { getMap } from "../../../managers/MapManager"
export const PostDetails = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [map, setMap] = useState("")
    useEffect(() => {
        getAllPosts(`/${postId}`).then(res => setPost(res))
    },[])
    useEffect(() => {
      getMap(post?.attraction?.coordinates).then(res => setMap(res))
    },[post])


  return (
    <div>
      <img src={map.url} alt="Static Map" />
    </div>
  );
}