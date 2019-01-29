import React from "react";

const RouteList = ({ routes, deleteRoute }) => {
  const list = routes.map(route => {
    return (
      <li className="collection-item" key={route.id}>
        <span>
          {route.route}
          <a
            href="#!"
            className="secondary-content"
            onClick={deleteRoute.bind(null, route.id)}
          >
            <i className="material-icons">delete</i>
          </a>
        </span>
      </li>
    );
  });

  if (list.length) {
    return <ul className="collection">{list}</ul>;
  } else {
    return null;
  }
};

export default RouteList;
