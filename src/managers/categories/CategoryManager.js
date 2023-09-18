export const getAllCategories = function() {
  return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    }).then(res => res.json())
}