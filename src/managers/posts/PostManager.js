export const getAllPosts = (postId = '') => {
    return fetch(`http://LB-271377299.us-east-1.elb.amazonaws.com:8000/posts${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to propagate it to the caller
    });
}

export const getPostsByUser = (userId) => {
    return fetch(`http://3.84.82.120:8000/posts?user=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`http://3.84.82.120:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
}

export const updatePost = (id, newPost) => {
    return fetch(`http://3.84.82.120:8000/posts/${id}`,{
        method: "PUT",
        headers: {
        "Authorization": `Token ${localStorage.getItem('tt_token')}`,
        "Content-Type": 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    
}

export const createPost = (newPost) => {
    return fetch('http://3.84.82.120:8000/posts', {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newPost)
    }).then(res => res.json())
}