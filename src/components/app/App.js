import { useSelector } from "react-redux";

import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";
import BottomFixedSpinner from "../bottomFixedSpinner/BottomFixedSpinner";

import "./app.scss";

const App = () => {
  const heroesloadingStatus = useSelector(
    (state) => state.heroes.loadingStatus
  );
  let spinnerIsNeeded = false;
  let spinnerLabel = "";

  switch (heroesloadingStatus) {
    case "fetching":
      spinnerIsNeeded = true;
      spinnerLabel = "Загрузка героев";
      break;
    case "creating":
      spinnerIsNeeded = true;
      spinnerLabel = "Создание нового героя";
      break;
    case "deleting":
      spinnerIsNeeded = true;
      spinnerLabel = "Удаление героя";
      break;
    default:
      spinnerIsNeeded = false;
      spinnerLabel = "";
  }

  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
      <BottomFixedSpinner
        dataIsSending={spinnerIsNeeded}
        label={spinnerLabel}
      />
    </main>
  );
};

export default App;
