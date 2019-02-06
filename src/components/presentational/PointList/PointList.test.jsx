import React from "react";
import { shallow, mount } from "enzyme";

import PointList from "./PointList";

describe("PointList component tests", () => {
  const deletePoint = jest.fn(),
    onDragEnd = jest.fn();

  it("should render correctly", () => {
    const props = {
        points: [],
        deletePoint,
        onDragEnd
      },
      PointListComponent = shallow(<PointList {...props} />);
    expect(PointListComponent).toMatchSnapshot();
  });

  it("should render correct list item", () => {
    const testProps = {
        points: [
          {
            id: 1,
            point: null
          }
        ],
        deletePoint,
        onDragEnd
      },
      PointListComponent = mount(<PointList {...testProps} />);
    expect(
      PointListComponent.find(".collection-item")
        .find("span")
        .text()
    ).toEqual("Точка маршрута 1delete");
  });

  it("check deletePoint callback", () => {
    const testProps = {
        points: [
          {
            id: 1,
            point: null
          }
        ],
        deletePoint,
        onDragEnd
      },
      PointListComponent = mount(<PointList {...testProps} />),
      a = PointListComponent.find(".collection-item").find("a");
    a.simulate("click");
    expect(deletePoint).toHaveBeenCalledTimes(1);
  });

/*   it("check onDragEnd callback", () => {
    const testProps = {
        points: [
          {
            id: 1,
            point: null
          }
        ],
        deletePoint,
        onDragEnd
      },
      PointListComponent = mount(<PointList {...testProps} />),
      item = PointListComponent.find('.collection-item');
      item.simulate('dragend');
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  }); */
});
