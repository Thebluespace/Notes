import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from "../store/Home";

class NewNote extends Component {

    state = {
        NoteTitle: "",
        NoteText: "",
        Madeby: "",
        isLoading: false
    };

    componentWillMount() {

    };

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    };

    submitNote = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const note = { NoteTitle: this.state.NoteTitle, Madeby: this.state.Madeby, NoteText: this.state.NoteText };
        this.props.addNote(note);
        setTimeout(this.props.history.push('/'), 1500);
    };

    cancelNote = event => {
        event.preventDefault();
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
            <div className="justify-content-center">
                <div id="creationcontainer">
                        <div class="field">
                            <label class="label">Alias</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter Alias" name="Madeby" value={this.state.Madeby} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Note Title</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter Note Title" name="NoteTitle" value={this.state.NoteTitle} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Message</label>
                            <div class="control">
                                <textarea class="textarea" placeholder="Textarea" name="NoteText" value={this.state.NoteText} onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link">Submit</button>
                                {!this.state.isLoading ? <span /> :
                                    <span class="icon is-medium">
                                        <i class="fas fa-spinner fa-pulse"></i>
                                    </span>
                                }
                            </div>
                            <div class="control">
                                <button class="button is-text">Cancel</button>
                            </div>
                        </div>
                </div>
            </div>
            </div>
        )
    };
}
export default connect(state => ({ notes: state.home }), dispatch => bindActionCreators(actionCreators, dispatch))(NewNote);