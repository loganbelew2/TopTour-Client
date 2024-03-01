export const getAllCategories = function() {
  return fetch(`http://3.84.82.120:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("tt_token")}`
        }
    }).then(res => res.json())
}