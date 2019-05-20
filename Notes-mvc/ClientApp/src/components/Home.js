import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from "../store/Home";

class Home extends Component {

    state = {
        notes: [],
        NoteID: 0,
        NoteTitle: "",
        NoteText: "",
        Madeby: "",
        Updatedby: "",
        isEditing: false,
        isCreating: true,
        isLoading: false
    };

    componentWillMount() {
        this.props.requestNotes();
    }

    componentWillReceiveProps(props) {
        if (this.state.NoteText === "" && props.notes.NoteText != "") {
            this.setState({ NoteText: props.notes.NoteText, NoteID: props.notes.NoteID, NoteTitle: props.notes.NoteTitle });
        }
    }

    deleteNote = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.props.deleteNote(event.target.id);
        setTimeout(this.props.requestNotes, 1500);
    }

    newNote = event => {
        event.preventDefault();
        this.props.triggerNew();
    }

    editNote = event => {
        event.preventDefault();
        const id = event.target.id;
        let note = this.props.notes.notes.find(x => x.noteId == id);
        let item = { NoteTitle: note.noteTitle, NoteText: note.noteTitle, NoteID: note.noteId };
        this.props.triggerEdit(item);
    }

    saveEdit = event => {
        event.preventDefault();
        if (this.state.NoteText.length < 1 || this.state.Updatedby.length < 1) {
            return alert("Please fill in all fields!");
        }
        this.setState({ isLoading: true });
        const note = { NoteID: this.state.NoteID, Updatedby: this.state.Updatedby, NoteText: this.state.NoteText };
        this.props.updateNote(note);
        setTimeout(this.props.requestNotes, 1500);
    }

    cancelModal = event => {
        event.preventDefault();
        this.props.cancel();
    }

    saveNewNote = event => {
        event.preventDefault();
        if (this.state.NoteTitle.length < 1 || this.state.NoteText.length < 1 || this.state.Madeby.length < 1) {
            return alert("Please fill in all fields!");
        }
        this.setState({ isLoading: true });
        const note = { NoteTitle: this.state.NoteTitle, Madeby: this.state.Madeby, NoteText: this.state.NoteText };
        this.props.addNote(note);
        setTimeout(this.props.requestNotes, 1500);
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        //console.log(name, value);
        this.setState({
            [name]: value
        });
    };

    newNoteContainer(props) {
        return (
            <div id="creationcontainer">
                <div className="field">
                    <label className="label">Alias</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter Alias" name="Madeby" value={this.state.Madeby} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Note Title</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter Note Title" name="NoteTitle" value={this.state.NoteTitle} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Note Contents</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Textarea" name="NoteText" value={this.state.NoteText} onChange={this.handleInputChange}></textarea>
                    </div>
                </div>
            </div>
        )
    }

    editNoteContainer(props) {
        return (
            <div id="creationcontainer">
                <div className="field">
                    <label className="label">Alias</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter Alias" name="Updatedby" value={this.state.Updatedby} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Note Contents</label>
                    <div className="control">
                        <textarea className="textarea" name="NoteText" value={this.state.NoteText} onChange={this.handleInputChange}>{props.NoteText}</textarea>
                    </div>
                </div>
            </div>
        )
    }

    renderModal(props) {
        if (this.props.notes.isCreating) {
            return (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <button className="delete" aria-label="close" onClick={this.cancelModal}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.newNoteContainer(this.props)}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" name={props.noteId} onClick={this.saveNewNote}>Save changes</button>
                            <button className="button" onClick={this.cancelModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        } else if (this.props.notes.isEditing) {
            return (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{props.NoteTitle}</p>
                            <button className="delete" aria-label="close" onClick={this.cancelModal}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.editNoteContainer(props)}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" name={this.props.NoteId} onClick={this.saveEdit}>Save changes</button>
                            <button className="button" onClick={this.cancelModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        } else { return (null) }
    }

    newNoteBox(props) {
        return (
            <div className="box" key={props.noteId}>
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{props.noteTitle}</strong> <small>{props.updatedOn ? "Updated On: " + props.updatedOn : "Made By: " +props.createdOn}</small>
                                <br/>
                                {props.noteText}
                            </p>
                        </div>
                        <nav className="level is-mobile">
                            <div className="level-left">
                                <a className="level-item" aria-label="edit-note">
                                    <span className="icon is-small" name={props.noteId}>
                                        <i className="fas fa-edit" aria-hidden="true" name={props.noteId} id={props.noteId} onClick={this.editNote}></i>
                                    </span>
                                </a>
                                <a className="level-item" aria-label="delete-note">
                                    <span className="icon is-small">
                                        <i className="fas fa-eraser" aria-hidden="true" name={props.noteId} id={props.noteId} onClick={this.deleteNote}></i>
                                    </span>
                                </a>
                                <p><small>{props.updatedBy ? "updatedBy: " + props.updatedBy : "Madeby: " + props.madeBy}</small></p>
                            </div>
                        </nav>
                    </div>
                 </article>
            </div>
            )
    }

    renderNotes(props) {
        if (props.notes.notes.length > 0) {
            return (props.notes.notes.map(x => this.newNoteBox(x)));
        } else {
            return (
                <div>
                    <h1 class="title">Uh-oh!</h1>
                    <h2 class="subtitle">No notes found! Try making a new note!</h2>
                </div>
                )
        }
    }

    render() {
        return (
            <div>
                <div className="columns is-vcentered" id="NotesContainer">
                    <div className="buttons">
                        <span className="button is-info" onClick={this.newNote}>Create New Note</span>
                    </div>
                </div>
                <br/>
                <div className="columns is-vcentered" id="NotesContainer">
                    <div className="container">
                        {this.props.notes.notes ? this.renderNotes(this.props) : <h2 class="subtitle">Fetching notes!</h2>}
                        {this.props.notes.isCreating ? this.renderModal(this.props.notes) : null}
                        {this.props.notes.isEditing ? this.renderModal(this.props.notes) : null}
                    </div>
                </div>
            </div>
            )
    };

}
export default connect(state => ({ notes: state.home }), dispatch => bindActionCreators(actionCreators, dispatch))(Home);