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

export const getExercisesByCatId = (catId, userId) => {
    return fetch(`${remoteURL}/exercises?categoryId=${catId}&userId=${userId}`)
    .then(response => response.json())
}

export const deleteExercise = (id) => {
    return fetch(`${remoteURL}/exercises/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
    }
