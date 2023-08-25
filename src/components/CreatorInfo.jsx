import React from 'react';
import { Link } from 'react-router-dom';

function CreatorInfo({ creator, onDelete }) {
    const goToYouTube = () => {
        if (creator.youtube) {
            window.open("https://www.youtube.com/@" + creator.youtube, "_blank");
        }
    }

    const goToInstagram = () => {
        if (creator.instagram) {
            window.open("https://www.instagram.com/" + creator.instagram, "_blank");
        }
    }

    return (
      <div className="Card" style={{ backgroundImage: `url(${creator.imageURL})` }}>
          <article>
              <div className="card-header-name">
                  <h3>{creator.name}</h3>

                  {creator.youtube && (
                      <span className="fa-brands fa-youtube" onClick={goToYouTube}></span>
                  )}

                  {creator.instagram && (
                      <span className="fa-brands fa-instagram" onClick={goToInstagram}></span>
                  )}
              </div>

              <div className="card-header-edit">
                  <Link to={'/view/' + creator.id} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}><i className="fa-solid fa-circle-info"></i></Link>
                  <Link to={'/edit/' + creator.id} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}><i className="fa-solid fa-pen"></i></Link>
              </div>

              <div className="card-description">
                  <p>{creator.description}</p>
              </div>
              
              <div className="card-actions">
                  <Link to={'/edit/' + creator.id} className="edit-button">Edit</Link>
                  <button onClick={() => onDelete(creator.id)} className="delete-button">Delete</button>
              </div>
          </article>
      </div>
  );
}

export default CreatorInfo;


