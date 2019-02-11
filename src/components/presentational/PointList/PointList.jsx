import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const PointList = ({ points, deletePoint, onDragEnd }) => {
  const list = points.map((point, index) => {
    return (
      <Draggable key={point.id} draggableId={point.id} index={index}>
        {provided => (
          <div
            className="collection-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>
              {`${index + 1}. ${point.point.name}`}
              <a
                href="#!"
                className="secondary-content"
                onClick={deletePoint.bind(null, point.id)}
              >
                <i className="material-icons">delete</i>
              </a>
            </span>
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef} className="point-list collection">
            {list}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PointList;
