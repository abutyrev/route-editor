import React, { Component } from "react";
import Map from "../presentational/Map";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.yMap = null;
  }

  initMap = () => {
    this.yMap = new window.ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
    });
  }

  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }

  render() {
    return <Map />;
  }
}

export default MapContainer;
