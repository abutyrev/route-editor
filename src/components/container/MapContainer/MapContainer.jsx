import React, { Component } from "react";
import Map from "../../presentational/Map/Map";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.yMap = null;
    this.pointsCollection = null;
    this.linesCollection = null;
  }

  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }

  shouldComponentUpdate(nextProps) {
    this.cleanMap();
    this.drawRoute(nextProps.points);
    if (this.props.points.length < nextProps.points.length)
      this.yMap.setCenter(
        nextProps.points[nextProps.points.length - 1].point.coords
      );
    return false;
  }

  initMap = () => {
    this.yMap = new window.ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
      controls: []
    });

    this.pointsCollection = new window.ymaps.GeoObjectCollection(null, {
      preset: "islands#icon",
      iconColor: "#735184",
      draggable: true
    });

    this.linesCollection = new window.ymaps.GeoObjectCollection(null, {});

    this.yMap.geoObjects.add(this.pointsCollection).add(this.linesCollection);
  };

  onDrag = (linesInfo, e) => {
    let coords = e.get("target").geometry.getCoordinates();
    if (linesInfo) {
      linesInfo.forEach(info => {
        let line = this.linesCollection.get(info.line);
        let lineCoords = line.geometry.getCoordinates();
        lineCoords[info.position] = coords;
        line.geometry.setCoordinates(lineCoords);
      });
    }
  };

  onDragEnd = (id, e) => {
    let coords = e.get("target").geometry.getCoordinates();
    const geocoder = window.ymaps.geocode(coords, {
      results: 1
    });
    geocoder.then(res => {
      let firstGeoObject = res.geoObjects.get(0),
        address = firstGeoObject.getAddressLine();

      this.props.updatePoint(id, { coords, address });
    });
  };

  setPoints = points => {
    points.forEach((point, index, points) => {
      let placemark = new window.ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: point.point.coords
        },
        properties: {
          iconContent: `${index + 1}`,
          balloonContent: point.point.address
        }
      });

      if (points[index - 1] && points[index + 1]) {
        placemark.events.add(
          "drag",
          this.onDrag.bind(null, [
            {
              line: index - 1,
              position: 1
            },
            {
              line: index,
              position: 0
            }
          ])
        );
      } else if (points[index - 1] && !points[index + 1]) {
        placemark.events.add(
          "drag",
          this.onDrag.bind(null, [
            {
              line: index - 1,
              position: 1
            }
          ])
        );
      } else if (points[index + 1]) {
        placemark.events.add(
          "drag",
          this.onDrag.bind(null, [
            {
              line: index,
              position: 0
            }
          ])
        );
      } else {
        placemark.events.add("drag", this.onDrag.bind(null, null));
      }

      placemark.events.add("dragend", this.onDragEnd.bind(null, point.id));

      this.pointsCollection.add(placemark);

      if (points[index + 1]) {
        this.setLine(point, points[index + 1]);
      }
    });
  };

  setLine = (begin, end) => {
    let line = new window.ymaps.Polyline(
      [begin.point.coords, end.point.coords],
      {},
      {
        strokeColor: "#00000088",
        strokeWidth: 4,
        editorMaxPoints: 2
      }
    );
    this.linesCollection.add(line);
  };

  cleanMap = () => {
    if (!this.linesCollection || !this.pointsCollection) return;

    if (!this.pointsCollection.getLength()) return;
    this.pointsCollection.removeAll();

    if (!this.linesCollection.getLength()) return;
    this.linesCollection.removeAll();
  };

  drawRoute = points => {
    this.setPoints(points);
  };

  render() {
    return <Map />;
  }
}

export default MapContainer;
