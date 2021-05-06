import React from "react";
import { Link } from "react-router-dom";

export const ProgressNoteCard = ({ note, handleDeleteNote }) => {

   

    return (
        <div className="card">
            <div className="card-content">
            <p className="card-header-title">{note.completion_date}:</p>
            <div className="card-content">
                <p className="content">{note.progressNote}</p>
            </div>

            <div className="note_bttn">
                <Link className="button is-primary is-small" to={`/note/${note.id}/edit`}>Edit</Link>
                <button className="button is-light is-small" type="button" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
            </div>
        </div>
    );
}
