import React from "react";
import UserContext from '../ContextProvider';


export default class AddFolder extends React.Component {
  state = {
    title: {
      value: '',
      touched: false
    }
  };

  newTitle = (submittedName) => {
    this.setState({ title: { value: submittedName, touched: true } })
  }

  checkName() {
    const title = this.state.title.value;
    if (title.length > 15) {
      return `Folder name cannot contain more than 15 characters`
    }
    else if (title.length < 1) {
      return 'Please enter text';
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ handleNewFolderSubmit }) => (
          <div className="add-folder-form">
            <h2>Add a New Folder</h2>
            <form onSubmit={(e) => handleNewFolderSubmit(e, this.state.title.value, this.props.history)}>
              <label htmlFor="add-new-folder">Your Folder Name:
              {this.state.title.touched &&
                  <p className="error">{this.checkName()}</p>
                }

              </label>
              <input onChange={e => this.newTitle(e.target.value)} id="add-new-folder" type="text" placeholder="folder" required></input>

              <button disabled={this.checkName()} type="submit">Submit</button>
            </form>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

