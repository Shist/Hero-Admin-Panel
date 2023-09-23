import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useGetHeroesQuery } from "../../api/apiSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "../heroesListItem/heroesListItem.scss";

const HeroesList = ({
  setGetIsLoading,
  setDeleteIsLoading,
  deleteIsError,
  setDeleteIsError,
  createIsError,
}) => {
  const {
    data: heroes = [],
    isFetching: getIsFetching,
    isLoading: getIsLoading,
    isError: getIsError,
  } = useGetHeroesQuery();

  useEffect(() => {
    setGetIsLoading(getIsLoading || getIsFetching);
    // eslint-disable-next-line no-use-before-define
  }, [getIsLoading, getIsFetching]);

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === "all") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  if (getIsLoading || getIsFetching) {
    return <Spinner />;
  } else if (getIsError) {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки загрузки героев
      </h5>
    );
  } else if (deleteIsError) {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки удаления героя
      </h5>
    );
  } else if (createIsError) {
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
        <HeroesListItem
          id={id}
          setDeleteIsLoading={setDeleteIsLoading}
          setDeleteIsError={setDeleteIsError}
          {...props}
        />
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
