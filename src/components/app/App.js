import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../../actions";

import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";

import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line no-use-before-define
  }, []);

  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default App;
