import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllPosts } from "../../../managers/PostManager"

export const PostDetails = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        getAllPosts(`/${postId}`).then(res => setPost(res))
    },[])


    const mapUrl =
    'https://maps.googleapis.com/maps/api/staticmap' +
    '?center=40.714728,-73.998672' + // Specify the map center (latitude and longitude)
    '&zoom=12' + // Specify the zoom level
    '&size=400x400' + // Specify the size of the map
    '&key=YOUR_API_KEY'; // Replace with your Google Maps API key

  return (
    <div>
      {/* Display the static map using an img element */}
      <img src={mapUrl} alt="Static Map" />
    </div>
  );
}