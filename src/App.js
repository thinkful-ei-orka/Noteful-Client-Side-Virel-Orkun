import React from "react";
import Header from "./Header";
import Main from "./Main/Main";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import GoBack from "./Sidebar/GoBack";
import UserContext from "./ContextProvider";

class App extends React.Component {
  state = {
    folders: [
      {
        id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Important",
      },
      {
        id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Super",
      },
      {
        id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Spangley",
      },
    ],
    notes: [
      {
        id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Dogs",
        modified: "2019-01-03T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Corporis accusamus placeat quas non voluptas.",
      },
      {
        id: "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Cats",
        modified: "2018-08-15T23:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Eos laudantium quia ab blanditiis temporibus necessitatibus.",
      },
      {
        id: "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Pigs",
        modified: "2018-03-01T00:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Occaecati dignissimos quam qui facere deserunt quia.",
      },
    ],
  };

  fetchAPI = (endpoint) => {
      return fetch()
    }


  render() {
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
        <Route path="/" exact component={Main} />

        <Route
          path="/folder/:folderId"
          render={(routerProps) => {
            console.log(routerProps.match.params.folderId);
            return (
              <Main
                folderId={routerProps.match.params.folderId}
              />
            );
          }}
        />

        <Route
          path="/note/:noteId"
          render={(routerProps) => (
            <Main
              showDescription={true}
              notes={this.state.notes.filter(
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