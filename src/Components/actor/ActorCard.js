import React from "react";
import { StyledActorCard } from "./ActorCard.styled";

const ActorCard = ({ name, birthday, deathday, gender, country, image }) => {
  return (
    <StyledActorCard>
      <div className="img-wrapper">
        <img src={image} alt="person" />
      </div>
      <h1>
        {name} {gender ? `(${gender})` : null}
      </h1>
      <p>{country ? `comes from ${country}` : "no country known"}</p>
      {birthday ? <p>Born{birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : "Alive"}</p>
    </StyledActorCard>
  );
};

export default ActorCard;
