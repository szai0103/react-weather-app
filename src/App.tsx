import React from "react";
import "./App.css";
import Header from "./components/Header";

class App extends React.Component<any, any> {

  componentDidMount() {
    window.console.info("App component mounted");
  }

  render() {
    return (
      <div>
        <Header auth={this.props.auth} {...this.props} />
      </div>
    );
  }
}

export default App;
