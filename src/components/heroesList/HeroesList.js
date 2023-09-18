import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "../heroesListItem/heroesListItem.scss";

const HeroesList = () => {
  const { heroes, loadingStatus, activeFilter } = useSelector((state) => state);

  if (loadingStatus === "loading") {
    return <Spinner />;
  } else if (loadingStatus === "fetch-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки загрузки героев и фильтров
      </h5>
    );
  } else if (loadingStatus === "delete-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки удаления героя
      </h5>
    );
  } else if (loadingStatus === "send-error") {
    return (
      <h5 className="text-center mt-5">
        Ошибка во время попытки отправки нового героя
      </h5>
    );
  }

  const renderHeroesList = (arr) => {
    const filteredArr =
      activeFilter === "all"
        ? arr
        : arr.filter((item) => item.element === activeFilter);

    if (filteredArr.length === 0) {
      return (
        <CSSTransition timeout={300} classNames="heroes-list-item">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return filteredArr.map(({ id, ...props }) => (
      <CSSTransition key={id} timeout={300} classNames="heroes-list-item">
        <HeroesListItem id={id} {...props} />
      </CSSTransition>
    ));
  };

  const elements = renderHeroesList(heroes);
  return (
    <TransitionGroup component="ul" appear>
      {elements}
    </TransitionGroup>
  );
};

export default HeroesList;
