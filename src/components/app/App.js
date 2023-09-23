import { useState } from "react";
import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";
import HeroesFilters from "../heroesFilters/HeroesFilters";
import BottomFixedSpinner from "../bottomFixedSpinner/BottomFixedSpinner";

import "./app.scss";

const App = () => {
  const [getIsLoading, setGetIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteIsError, setDeleteIsError] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [createIsError, setCreateIsError] = useState(false);

  let spinnerIsNeeded = false;
  let spinnerLabel = "";

  if (getIsLoading) {
    spinnerIsNeeded = true;
    spinnerLabel = "Загрузка героев";
  } else if (deleteIsLoading) {
    spinnerIsNeeded = true;
    spinnerLabel = "Удаление героя";
  } else if (createIsLoading) {
    spinnerIsNeeded = true;
    spinnerLabel = "Создание нового героя";
  } else {
    spinnerIsNeeded = false;
    spinnerLabel = "";
  }

  return (
    <main className="app">
      <div className="content">
        <HeroesList
          setGetIsLoading={setGetIsLoading}
          setDeleteIsLoading={setDeleteIsLoading}
          deleteIsError={deleteIsError}
          setDeleteIsError={setDeleteIsError}
          createIsError={createIsError}
        />
        <div className="content__interactive">
          <HeroesAddForm
            setCreateIsLoading={setCreateIsLoading}
            setCreateIsError={setCreateIsError}
          />
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
