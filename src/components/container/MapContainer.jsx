import React, { Component } from "react";
import Map from "../presentational/Map";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.yMap = null;
    this.routeCollection = null;
    this.lineCollection = null;
  }

  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }

  initMap = () => {
    this.yMap = new window.ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
      controls: []
    });

    this.routeCollection = new window.ymaps.GeoObjectCollection(null, {
      preset: "islands#icon",
      iconColor: "#735184",
      draggable: true
    });

    this.lineCollection = new window.ymaps.GeoObjectCollection(null, {
      color: "red"
    });

    this.yMap.geoObjects.add(this.routeCollection).add(this.lineCollection);
  };

  drawRoutes = () => {
    const routes = this.props.routes.slice();

    routes.forEach((route, index, routes) => {
      let placemark = new window.ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: route.route.coords
        },
        properties: {
          iconContent: `${index + 1}`,
          balloonContent: route.route.address
        }
      });
      this.routeCollection.add(placemark);
    });
  };

  render() {
    this.drawRoutes();
    return <Map />;
  }
}

export default MapContainer;