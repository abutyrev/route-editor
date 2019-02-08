import React, { Component } from "react";
import Input from "./components/presentational/Input/Input";
import PointList from "./components/presentational/PointList/PointList";
import MapContainer from "./components/container/MapContainer/MapContainer";

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
      points: [],
      isMapReady: false
    };
    this.id = 0;
  }

  generateId = () => {
    ++this.id;
    return this.id;
  };

  addPoint = point => {
    const points = this.state.points.slice(),
      id = this.generateId();

    this.setState({
      points: [...points, { id, point }]
    });
  };

  updatePoint = (id, point) => {
    const points = this.state.points.slice();
    const index = points.findIndex(point => {
      if (point.id === id) return true;
      return false;
    });

    if (index !== -1) {
      points[index].point = point;
      this.setState({
        points
      });
    } else {
      throw new Error("no id found");
    }
  };

  deletePoint = id => {
    const points = this.state.points.filter(point => {
      return point.id !== id;
    });
    this.setState({
      points
    });
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const points = reorder(
      this.state.points,
      result.source.index,
      result.destination.index
    );

    this.setState({
      points
    });
  };

  mapReadyCallback = () => {
    this.setState({
      isMapReady: true
    });
  };

  render() {
    return (
      <div className="App">
        <div className="UserField">
          <Input addPoint={this.addPoint} isMapReady={this.state.isMapReady} />
          {this.state.points.length ? (
            <PointList
              points={this.state.points}
              deletePoint={this.deletePoint}
              onDragEnd={this.onDragEnd}
            />
          ) : null}
        </div>
        <div className="MapField">
          <MapContainer
            points={this.state.points}
            updatePoint={this.updatePoint}
            mapReadyCallback={this.mapReadyCallback}
          />
        </div>
      </div>
    );
  }
}

export default App;
