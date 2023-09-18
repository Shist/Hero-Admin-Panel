import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createSelector } from "reselect";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../../actions";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "../heroesListItem/heroesListItem.scss";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroesArr,
    (activeFilter, heroesArr) => {
      if (activeFilter === "all") {
        return heroesArr;
      } else {
        return heroesArr.filter((item) => item.element === activeFilter);
      }
    }
  );
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesloadingStatus = useSelector(
    (state) => state.heroes.loadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
    // eslint-disable-next-line no-use-before-define
  }, []);

  if (heroesloadingStatus === "fetching") {
    return <Spinner />;
  } else if (heroesloadingStatus === "fetch-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки загрузки героев
      </h5>
    );
  } else if (heroesloadingStatus === "delete-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки удаления героя
      </h5>
    );
  } else if (heroesloadingStatus === "create-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки отправки нового героя
      </h5>
    );
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={300} classNames="heroes-list-item">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => (
      <CSSTransition key={id} timeout={300} classNames="heroes-list-item">
        <HeroesListItem id={id} {...props} />
      </CSSTransition>
    ));
  };

  const elements = renderHeroesList(filteredHeroes);
  return (
    <TransitionGroup component="ul" appear>
      {elements}
    </TransitionGroup>
  );
};

export default HeroesList;
