const remoteURL = "http://localhost:8088"
//may not be a necessary component 
export const getAllCategories = () => {
    return fetch(`${remoteURL}/categories`)
    .then(response => response.json())
}