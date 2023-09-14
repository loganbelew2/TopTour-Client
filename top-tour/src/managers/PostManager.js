export const getAllPosts = (postId = '') => {
    return fetch(`http://localhost:8000/posts${postId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}