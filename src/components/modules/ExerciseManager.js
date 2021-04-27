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