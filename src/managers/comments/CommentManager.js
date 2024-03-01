export const getCommentsByPost = (id) => {
    return fetch(`http://3.84.82.120:8000/comments?post=${id}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const getCommentsByUser = (id) => {
    return fetch(`http://3.84.82.120:8000/comments?user=${id}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const addComment = (postId, content) => {
    return fetch(`http://3.84.82.120:8000/comments`,{
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            post: postId,
            content: content
        })
    })
    .then(res => res.json())  
}


export const editComment = (id, newComment) => {
    return fetch(`http://3.84.82.120:8000/comments/${id}`,{
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({content: newComment})
    })
}

export const deleteComment = (id) => {
    return fetch(`http://3.84.82.120:8000/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
}