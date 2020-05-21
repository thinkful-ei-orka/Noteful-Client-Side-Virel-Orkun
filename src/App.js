import React from "react";
import Header from "./Header";
import Main from "./Main/Main";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import GoBack from "./Sidebar/GoBack";
import UserContext from "./ContextProvider";
import NoteList from './Main/NoteList';
import Note from './Main/Note';

class App extends React.Component {
  
  state = {
    folders: [],
    notes: [],
  };

  fetchAPI = (endpoint) => {
    return fetch(`http://localhost:9090/${endpoint}`)
      .then((res) => {
        if (res.ok) {
                return res.json()
              }
      })
      .then((data) => {
        return data
      })
      
  }

  componentDidMount() {
    this.fetchAPI('notes')
      .then((res) => {
        this.setState({
          notes: res
      })
      })
    
    this.fetchAPI('folders')
      .then((res) => {
        this.setState({
          folders: res
      })
    })
  }


  render() {
    console.log(this.state)
    if (this.state.notes.length === 0 || this.state.folders.length === 0) {
    return <p>Loading...</p>
    }
    return (
      <UserContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
        }}
      >
         <Header/>
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
                 showDescription={true}
                 note={this.state.notes.filter(
                     (note) => note.id === routerProps.match.params.noteId
                 )}
           />
         )}
       />  
            

       
      </div>
        </main>
      </UserContext.Provider>
    );
  }
}

export default App;

// return (
//
//  
//   <div className="sidebar-router">
//     <Route path ='/' exact render={(routerProps) =>
//     <Sidebar folders={this.state.folders} />
//     }/>

//     <Route path ='/folder/:folderId' component={Sidebar} />
//     }/>

//     <Route path ='/note/:noteId' render={(routerProps) => {
//     console.log(routerProps)
//     let note = this.state.notes.find(note => note.id ===  routerProps.match.params.noteId)
//     let folder = this.state.folders.find(folder => folder.id === note.folderId)
//     return <GoBack folderName={folder.name}/>
//     }}/>
//   </div>

//   <div className="main-router">
//     <Route path='/' exact render={(routerProps) =>
//     <Main notes={this.state.notes}/>
//     }/>

//     <Route path='/folder/:folderId' render={(routerProps) =>{
//       console.log(routerProps.match.params.folderId)
//       return <Main notes={this.state.notes.filter(note=> note.folderId === routerProps.match.params.folderId)}/>
//     }}/>

//     <Route path='/note/:noteId' render={(routerProps) =>
//     <Main showDescription={true} notes={this.state.notes.filter(note => note.id ===  routerProps.match.params.noteId)}/>
//     }/>

//   </div>

// </main>







  // //Sidebar Context

  // renderSidebar() {
  //   return (
  //       <div className="sidebar-router">
  //         <Route path="/" exact component={Sidebar} />

  //         <Route path="/folder/:folderId" component={Sidebar} />

  //         <Route
  //           path="/note/:noteId"
  //           render={(routerProps) => {
  //             console.log(routerProps);
  //             let note = this.state.notes.find(
  //               (note) => note.id === routerProps.match.params.noteId
  //             );
  //             let folder = this.state.folders.find(
  //               (folder) => folder.id === note.folderId
  //             );
  //             return <GoBack folderName={folder.name} />;
  //           }}
  //         />
  //       </div>
  //   );
  // }

  // //Main render
  // renderMain() {
  //   return (
  //     <div className="main-router">
  //       <Route path="/" component={Main} />

  //       <Route
  //         path="/folder/:folderId"
  //         render={(routerProps) => {
  //           console.log(routerProps.match.params.folderId);
  //           return (
  //             <Main
  //               notes={this.state.notes.filter(
  //                 (note) => note.folderId === routerProps.match.params.folderId
  //               )}
  //             />
  //           );
  //         }}
  //       />

  //       <Route
  //         path="/note/:noteId"
  //         render={(routerProps) => (
  //           <Main
  //             showDescription={true}
  //             notes={this.state.notes.filter(
  //               (note) => note.id === routerProps.match.params.noteId
  //             )}
  //           />
  //         )}
  //       />
  //     </div>
  //   );
  // }