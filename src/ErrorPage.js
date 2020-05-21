import React from 'react';

export default class ErrorPage extends React.Component {
    state = { error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
      console.error(error);
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
    render() {
        // If there was an error, show an error page
        if (this.state.error) {
            return (
                    <div>
                    <h1>Something seems to have gone wrong</h1>
                    <p>Try refreshing the page</p>
                    </div>
            );
        }
        // Otherwise, render the children
        return this.props.children;
    }
}
