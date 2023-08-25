import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

function ShowCreators({ data = [] }) {
  return (
      <div className="ShowCreators">
          {data.length > 0 ? (
              data.map(creator => (
                  <div key={creator.id} className="creator-card">
                      <img src={creator.imageURL} alt={`${creator.name}'s avatar`} className="creator-image" />
                      <h3>{creator.name}</h3>
                      {/* ... other content ... */}
                      <Link to={`/view/${creator.id}`} className="view-link">View Details</Link>
                  </div>
              ))
          ) : (
              <h3>No Creators</h3>
          )}
      </div>
  );
}


export default memo(ShowCreators);
