import React from "react";

const Input = props => {
  return (
    <from className="col s12">
        <div className="input-field col s12">
          <input type="text" id="new_route" className="validate" />
          <label htmlFor="new_route">Новая точка маршрута</label>
        </div>
    </from>
  );
};

export default Input;
