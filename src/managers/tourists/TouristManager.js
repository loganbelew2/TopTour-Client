
export const getTourists = (userId) => {
    return fetch(`http://localhost:8000/tourists/${userId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}