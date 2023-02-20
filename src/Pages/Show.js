import React from "react";
import ShowMainData from "../Components/show/ShowMainData";
import Details from "../Components/show/Details";
import Seasons from "../Components/show/Seasons";
import Cast from "../Components/show/Cast";
import { ShowPageWrapper, InfoBlock } from "./Show.styled";

import { useParams } from "react-router-dom";
// import { getApi } from "../misc/config";
import { useShow } from "../misc/custom-hooks";

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occurred: {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        image={show.image}
        rating={show.rating}
        tags={show.genres}
        summary={show.summary}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          network={show.network}
          premiered={show.premiered}
          status={show.status}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
