import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import GoBack from "./Sidebar/GoBack";
import UserContext from "./ContextProvider";
import NoteList from "./Main/NoteList";
import Note from "./Main/Note";
import AddFolder from "./Add/AddFolder";
import AddNote from "./Add/AddNote";
import ErrorPage from "./ErrorPage";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  };

  fetchAPI = (endpoint) => {
    return fetch(`http://localhost:9090/${endpoint}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        return data;
      });
  };

  deleteNote = (noteId) => {
    return fetch(`http://localhost:9090/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      const notes = this.state.notes.filter((note) => {
        return note.id !== noteId;
      });
      this.setState({
        notes: notes,
      });
    });
  };

  handleNewFolderSubmit = (event, folderName, history) => {
    event.preventDefault();
    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: folderName }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then((response) => {
        const newFolder = [
          ...this.state.folders,
          { id: response.id, name: folderName },
        ];
        this.setState({ folders: newFolder });
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  handleNewNoteSubmit = (
    event,
    noteName,
    noteFolderId,
    noteContent,
    history
  ) => {
    event.preventDefault();
    const modified = Date.now();
    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: noteName,
        folderId: noteFolderId,
        content: noteContent,
        modified: modified,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then((response) => {
        const newNote = [
          ...this.state.notes,
          {
            id: response.id,
            name: noteName,
            modified: modified,
            folderId: noteFolderId,
            content: noteContent,
          },
        ];
        this.setState({ notes: newNote });
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  componentDidMount() {
    this.fetchAPI("notes").then((res) => {
      this.setState({
        notes: res,
      });
    });

    this.fetchAPI("folders").then((res) => {
      this.setState({
        folders: res,
      });
    });
  }

  render() {
    console.log(this.state);
    if (this.state.notes.length === 0 || this.state.folders.length === 0) {
      return <p>Loading...</p>;
    }
    return (
      <UserContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.deleteNote,
          handleNewFolderSubmit: this.handleNewFolderSubmit,
          handleNewNoteSubmit: this.handleNewNoteSubmit,
        }}
      >
        <ErrorPage>
          <Header />
        </ErrorPage>
        <ErrorPage>
          <main className="App">
            <div className="sidebar-router">
              <Route path="/" exact component={Sidebar} />

              <Route path="/folder/:folderId" component={Sidebar} />

              <Route
                path="/note/:noteId"
                render={(routerProps) => {
                  console.log(routerProps);
                  let note = this.state.notes.find(
                    (note) => note.id === routerProps.match.params.noteId
                  );
                  let folder = this.state.folders.find(
                    (folder) => folder.id === note.folderId
                  );
                  return <GoBack folderName={folder.name} />;
                }}
              />
            </div>

            <div className="main-router">
              <Route path="/" exact component={NoteList} />

              <Route
                path="/folder/:folderId"
                render={(routerProps) => {
                  console.log(routerProps.match.params.folderId);
                  return (
                    <NoteList
                      location={routerProps.location}
                      showDescription={false}
                      folderId={routerProps.match.params.folderId}
                    />
                  );
                }}
              />
              <Route
                path="/note/:noteId"
                render={(routerProps) => (
                  <Note
                    location={routerProps.location}
                    showDescription={true}
                    note={this.state.notes.filter(
                      (note) => note.id === routerProps.match.params.noteId
                    )}
                  />
                )}
              />
              <Route
                path="/add-folder"
                exact
                render={(routerProps) => (
                  <AddFolder
                    history={routerProps.history}
                    location={routerProps.location}
                  />
                )}
              />

              <Route
                path="/add-note"
                exact
                render={(routerProps) => (
                  <AddNote
                    history={routerProps.history}
                    location={routerProps.location}
                  />
                )}
              />
              
            </div>
          </main>
        </ErrorPage>
      </UserContext.Provider>
    );
  }
}

export default App;
