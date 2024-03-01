
export const getTouristById = (userId) => {
    return fetch(`http://3.84.82.120:8000/tourists/${userId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}