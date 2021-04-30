const remoteURL = "http://localhost:8088"

export const getAllSessions = (userId) => {
    return fetch(`${remoteURL}/sessions?userId=${userId}`)
    .then(response => response.json())
}

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

export const getExercisesBySessionId = (sessionId) => {
    return fetch(`${remoteURL}/session_exercises?_expand=exercise&sessionId=${sessionId}`)
    .then(response => response.json())
}

export const deleteSession = (sessionId) => {
    return fetch(`${remoteURL}/sessions/${sessionId}`, {
        method: "DELETE"
    }).then(result => result.json())
}