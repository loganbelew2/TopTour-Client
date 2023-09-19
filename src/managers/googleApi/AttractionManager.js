export const getAttractionsBySearch = (query) => {
    return fetch(`http://localhost:8000/attractionSearch?query=${query}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    }).then(res => res.json())
}

export const getAttractionByPlaceId = (placeId) => {
    return fetch(`http://localhost:8000/attractionById?query=${placeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    }).then(res => res.json())
}

export const postAttraction = (attraction) => {
    return fetch(`http://localhost:8000/attractions`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('tt_token')}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(attraction)
    })
}