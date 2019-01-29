import React, { Component } from "react";
import Input from "./components/presentational/Input";
import RouteList from "./components/presentational/RouteList";
import Map from "./components/presentational/Map";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
    this.id = 0;
  }

  generateId = () => {
    ++this.id;
    return this.id;
  };

  addRoute = route => {
    const routes = this.state.routes.slice(),
      id = this.generateId();

    this.setState({
      routes: [...routes, { id, route }]
    });
  };

  deleteRoute = id => {
    const routes = this.state.routes.filter(route => {
      return route.id !== id;
    });
    this.setState({
      routes
    });
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const routes = reorder(
      this.state.routes,
      result.source.index,
      result.destination.index
    );

    this.setState({
      routes
    });
  };

  render() {
    return (
      <div className="App row">
        <div className="UserField col s4">
          <Input addRoute={this.addRoute} />
          {this.state.routes.length ? (
            <RouteList
              routes={this.state.routes}
              deleteRoute={this.deleteRoute}
              onDragEnd={this.onDragEnd}
            />
          ) : null}
        </div>
        <div className="MapField col s8">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
