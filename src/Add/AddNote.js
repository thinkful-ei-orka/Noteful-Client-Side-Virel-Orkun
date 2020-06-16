import React from 'react';
import UserContext from '../ContextProvider';


export default class AddNote extends React.Component {

    state = {
        title: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false,
        },
        folderName: {
            value: '',
            touched: false
        }

    };

    newName = (submittedName) => {
        this.setState({ title: { value: submittedName, touched: true } })
    }

    newContent = (content) => {
        this.setState({ content: { value: content, touched: true } })
    }

    newNoteFolder = (folderName) => {
        this.setState({ folderName: { value: folderName, touched: true } })
    }

    checkName() {
        const title = this.state.title.value;
        if (title.length <= 3) {
            return 'Title should contain at least 4 letters'
        }
    }

    checkContent() {
        const content = this.state.content.value;
        if (content.length < 1) {
            return 'Please enter your content'
        }
    }

    checkFolder() {
        const folder = this.state.folderName.value;
        if (!folder) {
            return 'Selecting a folder is required'
        }
    }


    render() {
        return (
            <UserContext.Consumer>
                {({ handleNewNoteSubmit, folders }) => (
                    <section className="add-new-note">
                        <h2>Add a New Note</h2>
                        <form onSubmit={(e) => handleNewNoteSubmit(e, this.state.title.value, this.state.folderName.value, this.state.content.value, this.props.history)}>
                            <label htmlFor="addNote">Note Title:
                    {this.state.title.touched &&
                                    <p className="error">{this.checkName()}</p>
                                }
                            </label>
                            <input onChange={e => this.newName(e.target.value)} id="addNote" type="text" required></input>

                            <label htmlFor="description">Add content:
                    {this.state.content.touched &&
                                    <p className="error">{this.checkContent()}</p>
                                }
                            </label>
                            <textarea onChange={e => this.newContent(e.target.value)} id="description"></textarea>
                            <select className="select-folder" onChange={e => this.newNoteFolder(e.target.value)}>
                                <option>Select a folder</option>
                                {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.title}</option>)}
                            </select>
                            <p className="error">{this.checkFolder()}</p>
                            <button disabled={this.checkName() || this.checkContent() || this.checkFolder()} type="submit">Add Note</button>
                        </form>
                    </section>
                )}
            </UserContext.Consumer>


        )
    }
}

