import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { fetchHeroes, filteredHeroesSelector } from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "../heroesListItem/heroesListItem.scss";

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesloadingStatus = useSelector(
    (state) => state.heroes.loadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
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
