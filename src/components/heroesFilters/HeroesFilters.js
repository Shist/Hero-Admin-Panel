import { useDispatch, useSelector } from "react-redux";

import { filterChanged } from "../../actions";

var classNames = require("classnames");

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const btnClicked = (filterName) => {
    dispatch(filterChanged(filterName));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((item) => {
            let btnClass = null;
            switch (item.name) {
              case "all":
                btnClass = "btn-outline-dark";
                break;
              case "fire":
                btnClass = "btn-danger";
                break;
              case "water":
                btnClass = "btn-primary";
                break;
              case "wind":
                btnClass = "btn-success";
                break;
              case "earth":
                btnClass = "btn-secondary";
                break;
              default:
                btnClass = null;
            }
            return (
              <button
                key={item.id}
                className={classNames("btn", btnClass, {
                  active: item.name === activeFilter,
                })}
                onClick={() => btnClicked(item.name)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
