export const getComments = (id) => {
    return fetch(`http://localhost:8000/comments?post=${id}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}