import axios from "../utils/API";
const requestNotesType = 'REQUEST_NOTES';
const receiveNotesType = 'RECEIVE_NOTES';
const updateNoteType = 'UPDATE_NOTE';
const deleteNoteType = 'DELETE_NOTE';
const addNoteType = 'ADD_NOTE';
const triggerNew = 'TRIGGER_NEW';
const triggerEdit = 'TRIGGER_EDIT';
const cancel = 'CANCEL';
const initialState = {
    notes: [],
    NoteID: 0,
    NoteTitle: "",
    NoteText: "",
    Madeby: "",
    Updatedby: "",
    isEditing: false,
    isCreating: false,
    isLoading: false
};

//for testing Redux
let allNotes = {
    notes: []
};

export const actionCreators = {
    requestNotes: () => async (dispatch, getState) => {
        dispatch({ type: requestNotesType });
        try {
            const url = "/api/note/"
            const response = await fetch(url);
            const notes = await response.json();
            console.log(notes);
            allNotes = {
                notes: notes
            };
        } catch (error) {
            console.log(error.message);
        }

        dispatch({ type: receiveNotesType, allNotes });
    },

    triggerNew: () => async (dispatch, getState) => {

        dispatch({ type: triggerNew });
    },

    triggerEdit: (item) => async (dispatch, getState) => {

        dispatch({ type: triggerEdit, item });
    },

    addNote: (note) => async (dispatch, getState) => {
        try {
            const baseURL = "/api/note";
            const data = JSON.stringify(
                { NoteTitle: note.NoteTitle, Madeby: note.Madeby, NoteText: note.NoteText }
            );
            const fetchTask = fetch(baseURL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: data
            }).then((data) => {
                console.log(data);
                dispatch({ type: addNoteType});
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    updateNote: (note) => async (dispatch, getState) => {
        try {
            const baseURL = "/api/note";
            const data = JSON.stringify(
                { NoteID: note.NoteID, Updatedby: note.Updatedby, NoteText: note.NoteText }
            );
            const fetchTask = fetch(baseURL, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: data
            }).then((data) => {
                dispatch({ type: updateNoteType });
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteNote: (note) => async (dispatch, getState) => {
        try {
            const baseURL = "/api/note/delete/" + note;
            const fetchTask = fetch(baseURL, {
                method: "DELETE"
            }).then((data) => {
                dispatch({ type: deleteNoteType });
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    cancel: () => async (dispatch, getState) => {
        dispatch({ type: cancel });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    console.log(action.type);
    switch (action.type) {

        case requestNotesType: {
            return {
                ...state,
                isLoading: true,
                isCreating: false,
                isEditing: false
            }
        }
        case receiveNotesType: {
            var notes = action.allNotes.notes;
            //console.log(notes);
            return {
                ...state,
                notes: notes,
                isLoading: false,
                isCreating: false,
                isEditing: false
            }
        }
        case addNoteType: {
            //console.log(state);
            return {
                ...state,
                NoteTitle: "",
                NoteText: "",
                NoteID: "",
                isLoading: false,
                isCreating: false,
                isEditing: false
            }
        }
        case triggerNew: {
            return {
                ...state,
                isLoading: false,
                isCreating: true
            }
        }
        case triggerEdit: {
            console.log(action.item);
            return {
                ...state,
                NoteID: action.item.NoteID,
                NoteTitle: action.item.NoteTitle,
                NoteText: action.item.NoteText,
                isLoading: false,
                isEditing: true
            }
        }
        default: {
            return {
                ...state,
                NoteTitle: "",
                NoteText: "",
                NoteID: "",
                isLoading: false,
                isCreating: false,
                isEditing: false
            }
        }
    };
    return state
};