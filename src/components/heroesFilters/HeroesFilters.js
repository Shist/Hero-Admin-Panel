import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { fetchFilters } from "../../actions";
import { activeFilterChanged } from "./filtersSlice";

import Spinner from "../spinner/Spinner";

var classNames = require("classnames");

const HeroesFilters = () => {
  const {
    filtersArr,
    loadingStatus: filtersLoadingStatus,
    activeFilter,
  } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
    // eslint-disable-next-line no-use-before-define
  }, []);

  if (filtersLoadingStatus === "fetching") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "fetch-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки загрузки фильтров
      </h5>
    );
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filtersArr.map((item) => {
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
                onClick={() => dispatch(activeFilterChanged(item.name))}
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
