export const getPhoto = (photoRef) => {
    return fetch(`http://3.84.82.120:8000/photos?query=${photoRef}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    }).then(res => res.json())
}