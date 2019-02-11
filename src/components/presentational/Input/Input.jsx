import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      invalidInput: false
    };
  }

  changeHandler = e => {
    this.setState({
      value: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const coords = this.props.yMap.getCenter();
    const geocoder = window.ymaps.geocode(coords, {
      results: 1
    });
    geocoder
      .then(res => {
        let firstGeoObject = res.geoObjects.get(0),
          address = firstGeoObject.getAddressLine();
        this.props.addPoint({ name: this.state.value, coords, address });
        
        this.setState({
          value: ""
        });
      })
      .catch(err => {
        this.setState({
          invalidInput: true
        });
      });
  };

  render() {
    return (
      <form className="input-form" onSubmit={this.submitHandler}>
        <div className="input-field">
          <input
            type="text"
            id="new_point"
            className={
              this.state.invalidInput ? "invalid validate" : "validate"
            }
            value={this.state.value}
            onChange={this.changeHandler}
            disabled={!this.props.isMapReady}
          />
          <label htmlFor="new_point">Новая точка маршрута</label>
        </div>
      </form>
    );
  }
}

export default Input;
