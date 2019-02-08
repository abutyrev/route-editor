import React from "react";
import { shallow } from "enzyme";

import Map from "./Map";

describe("Map component tests", () => {
  it("should render correctly", () => {
    const MapComponent = shallow(<Map />);
    expect(MapComponent).toMatchSnapshot();
  });
});
