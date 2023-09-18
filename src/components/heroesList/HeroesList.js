import { useSelector } from "react-redux";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

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
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return filteredArr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} id={id} {...props} />;
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
