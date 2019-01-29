import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RouteList = ({ routes, deleteRoute, onDragEnd }) => {
  const list = routes.map((route, index) => {
    return (
      <Draggable key={route.id} draggableId={route.id} index={index}>
        {provided => (
          <div
            className="collection-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>
              {`Точка маршрута ${index + 1}`}
              <a
                href="#!"
                className="secondary-content"
                onClick={deleteRoute.bind(null, route.id)}
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
          <div ref={provided.innerRef} className="collection">
            {list}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RouteList;
