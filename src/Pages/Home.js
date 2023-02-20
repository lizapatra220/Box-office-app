import React, { useState } from "react";
import ActorCard from "../Components/actor/ActorCard";
import MainPageLayout from "../Components/MainPageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import ActorGrid from "../Components/actor/ActorGrid";
import { getApi } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
const Home = () => {
  const [input, setinput] = useLastQuery();
  const [results, setresults] = useState(null);
  const [onShowOption, setonShowOption] = useState("shows");
  const searchedShow = onShowOption === "shows";
  const onSearchValue = () => {
    getApi(`/search/${onShowOption}?q=${input}`).then((result) => {
      setresults(result);
    });
  };

  const onChangeValue = (ev) => {
    setinput(ev.target.value);
  };
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearchValue();
    }
  };
  const onRadioOption = (ev) => {
    setonShowOption(ev.target.value);
  };
  // console.log(onShowOption);
  const resultRender = () => {
    console.log("result", results);
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="search something"
        onChange={onChangeValue}
        value={input}
        onKeyDown={onKeyDown}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioOption}
            checked={searchedShow}
          />
        </label>
        <label htmlFor="actor-search">
          Actor
          <input
            id="actor-search"
            type="radio"
            value="people"
            onChange={onRadioOption}
            checked={!searchedShow}
          />
        </label>
      </div>
      <button type="text" onClick={onSearchValue}>
        Search
      </button>
      {resultRender()}
    </MainPageLayout>
  );
};

export default Home;
