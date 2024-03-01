export const postAttraction = (attraction) => {
    return fetch(`http://3.84.82.120:8000/attractions`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(attraction)
    })
}

export const getLastAttraction = () => {
    return fetch(`http://3.84.82.120:8000/attractions?last=last`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`
        }
    })
    .then(res => res.json())
}

export const editAttraction = (id, url) => {
    return fetch(`http://3.84.82.120:8000/attractions/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({photo_url: url})
    })
}
