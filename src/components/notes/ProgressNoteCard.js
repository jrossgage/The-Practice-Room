import React from "react";
import { Link } from "react-router-dom";

export const ProgressNoteCard = ({ note, handleDeleteNote }) => {

   

    return (
        <div className="card-content">
            <p className="date">{note.completion_date}:</p>
            <p className="progressNote">{note.progressNote}</p>

            <div className="note_bttn">
                <Link to={`/note/${note.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button type="button" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>

        </div>
    );
}
