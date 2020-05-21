import React from "react";
import UserContext from '../ContextProvider';

export default class AddFolder extends React.Component {
  state = {
    name: {
      value: '',
      touched: false
    }
  };

  newName = (submittedName) => {
    this.setState({name : {value: submittedName, touched: true}})
  }

  checkName() {
    const name = this.state.name.value;
    if (name.length > 15) {
      return `Folder name cannot contain more than 15 characters`
    }
    else if (name.length < 1) {
      return 'Please enter text';
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({handleNewFolderSubmit}) => (
      <div className="add-folder-form">
        <h2>Add a New Folder</h2>
        <form onSubmit={(e) =>  handleNewFolderSubmit(e, this.state.name.value, this.props.history)  }> 
          <label htmlFor="add-new-folder">Your Folder Name:
              {this.state.name.touched && 
              <p className="error">{this.checkName()}</p>
              } 
               
          </label>
          <input onChange={e => this.newName(e.target.value)} id="add-new-folder" type="text" placeholder="folder" required></input>
              
          <button disabled={this.checkName()} type="submit">Submit</button>
        </form>
          </div>
          )} 
        </UserContext.Consumer>
    );
  }
}
