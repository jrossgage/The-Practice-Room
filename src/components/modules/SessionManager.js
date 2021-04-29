const remoteURL = "http://localhost:8088"

export const addSession = (newSession) => {
    return fetch(`${remoteURL}/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSession)
    }).then(response => response.json())
}

export const addSessionExercise = (newSessionExercise) => {
    return fetch(`${remoteURL}/session_exercises`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSessionExercise)
    }).then(response => response.json())
}