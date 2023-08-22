import React from 'react';
import { Link } from 'react-router-dom';
import CreatorInfo from '../components/CreatorInfo';

// Pages/ShowCreators.jsx

function ShowCreators({ creators }) {
  return (
    <div className="creators-grid">
      {creators.length > 0 ? (
        creators.map(creator => (
          <div key={creator.id} className="creator-card">
            <img src={creator.imageURL} alt={`${creator.name}'s avatar`} className="creator-image"/>
            <h3>{creator.name}</h3>
            {/* ... other content ... */}
            <Link to={`/view/${creator.id}`} className="view-link">View Details</Link>
          </div>
        ))
      ) : (
        <p>No content creators found in the database.</p>
      )}
    </div>
  );
}




export default ShowCreators;
