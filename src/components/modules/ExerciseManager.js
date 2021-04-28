const remoteURL = "http://localhost:8088"

export const addExercise = (newExercise) => {
    return fetch(`${remoteURL}/exercises`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newExercise)
    }).then(response => response.json())
}

export const getAllExercises = () => {
    return fetch(`${remoteURL}/exercises`)
    .then(result => result.json())
}

export const getExercisesByCatId = (id) => {
    return fetch(`${remoteURL}/categories/${id}?_embed=exercises`)
    .then(response => response.json())
}

export const deleteExercise = (id) => {
    return fetch(`${remoteURL}/exercises/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
    }
