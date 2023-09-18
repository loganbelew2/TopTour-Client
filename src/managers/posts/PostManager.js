export const getAllPosts = (postId = '') => {
    return fetch(`http://localhost:8000/posts${postId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const getPostsByUser = (userId) => {
    return fetch(`http://localhost:8000/posts?user=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
}

export const updatePost = (id, newPost) => {
    return fetch(`http://localhost:8000/posts/${id}`,{
        method: "PUT",
        headers: {
        "Authorization": `Token ${localStorage.getItem('tt_token')}`,
        "Content-Type": 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    
}