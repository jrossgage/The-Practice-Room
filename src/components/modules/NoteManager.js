const remoteURL = "http://localhost:8088" 

export const addNote = (newNote) => {
    return fetch(`${remoteURL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    }).then(response => response.json())
}