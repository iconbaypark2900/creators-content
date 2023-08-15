import React from 'react';

function CreatorInfo({ creator }) {
  return (
    <div className="creator-info">
      <h2>{creator.name}</h2>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit Creator's Site
      </a>
      <p>{creator.description}</p>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
    </div>
  );
}

export default CreatorInfo;
