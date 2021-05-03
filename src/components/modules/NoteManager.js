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

export const getNotesByExercise = (id) => {
    return fetch(`${remoteURL}/notes?exerciseId=3`)
    .then(response => response.json())
}

export const deleteNote = (id) => {
    return fetch(`${remoteURL}/notes/${id}`, {
        method: "DELETE"
    }).then (result => result.json())
}

export const updateNote = (editedNote) => {
    return fetch(`${remoteURL}/notes/${editedNote.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedNote)
    }).then(data => data.json())
}

export const getNoteById = (id) => {
    return fetch(`${remoteURL}/notes/${id}`)
    .then(response => response.json())
}