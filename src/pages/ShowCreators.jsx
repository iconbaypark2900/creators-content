import React from 'react';
import CreatorInfo from '../components/CreatorInfo';

function ShowCreators({ creators }) {
  return (
    <div className="creators-list">
      {creators.length > 0 ? (
        creators.map(creator => <CreatorInfo key={creator.id} creator={creator} />)
      ) : (
        <p>No content creators found in the database.</p>
      )}
    </div>
  );
}

export default ShowCreators;
