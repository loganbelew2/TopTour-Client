export const getComments = (id) => {
    return fetch(`http://localhost:8000/comments?post=${id}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const addComment = (postId, content) => {
    return fetch(`http://localhost:8000/comments`,{
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
    return fetch(`http://localhost:8000/comments/${id}`,{
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({content: newComment})
    })
}

export const deleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
}