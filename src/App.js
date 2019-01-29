import React, { Component } from "react";
import Input from "./components/presentational/Input";
import RouteList from "./components/presentational/RouteList";
import Map from "./components/presentational/Map";

class App extends Component {
  render() {
    return (
      <div className="App row">
        <div className="UserField col s4">
          <Input />
          <RouteList />
        </div>
        <div className="MapField col s8">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
