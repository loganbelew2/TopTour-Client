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

