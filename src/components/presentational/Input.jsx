import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  changeHandler = e => {
    this.setState({
      value: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.addRoute(this.state.value);
    this.setState({
      value: ""
    });
  };

  render() {
    return (
      <form className="col s12" onSubmit={this.submitHandler}>
        <div className="input-field col s12">
          <input
            type="text"
            id="new_route"
            className="validate"
            value={this.state.value}
            onChange={this.changeHandler}
          />
          <label htmlFor="new_route">Новая точка маршрута</label>
        </div>
      </form>
    );
  }
}

export default Input;
