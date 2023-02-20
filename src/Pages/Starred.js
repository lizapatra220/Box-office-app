import React, { useEffect, useState } from "react";
import MainPageLayout from "../Components/MainPageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { getApi } from "../misc/config";
import { useShows } from "../misc/custom-hooks";
const Starred = () => {
  const [starred] = useShows();
  const [shows, setshows] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => getApi(`/shows/${showId}`));
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setshows(results);
          setloading(false);
        })
        .catch((err) => {
          seterror(err.message);
          setloading(false);
        });
    } else {
      setloading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {loading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!loading && !shows && <div>No shows is there</div>}
      {!loading && !error && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
