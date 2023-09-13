export const getAllPosts = () => {
    return fetch("http://localhost:8000/posts",{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}