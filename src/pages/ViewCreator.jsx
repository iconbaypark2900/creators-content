import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator({ data = []}) {
    const { id } = useParams();
    const [creator, setCreator] = useState({});

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0];
        setCreator(result);
    }, [data, id]);

    const goToYouTube = () => {
        window.open(creator.youtube, "_blank");
    };

    const goToInstagram = () => {
        window.open(creator.instagram, "_blank");
    };

    const deleteCreator = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            window.location = "/";
        }
    };

    return (
      <div className="ViewCreator">
  
          {creator && creator.imageURL && (
              <section className="creator-image">
                  <img src={creator.imageURL} alt={creator.name || 'Creator'} />
              </section>
          )}
  
          {creator && (
              <section className="creator-info">
                  <h2>{creator.name}</h2>
                  <p>{creator.description}</p>
  
                  {creator.youtube && (
                      <button className="social-button" onClick={goToYouTube}>
                          <i className="fa-brands fa-youtube"></i>@{creator.youtube}
                      </button>
                  )}
  
                  {creator.twitter && (
                      <button className="social-button" onClick={goToTwitter}>
                          <i className="fa-brands fa-twitter"></i>@{creator.twitter}
                      </button>
                  )}
  
                  {creator.instagram && (
                      <button className="social-button" onClick={goToInstagram}>
                          <i className="fa-brands fa-instagram"></i>@{creator.instagram}
                      </button>
                  )}
              </section>
          )}
  
          {creator && (
              <section className="modify-creator">
                  <Link to={`/edit/${creator.id}`}>
                      <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>Edit</button>
                  </Link>
                  <button onClick={deleteCreator} className="delete-button">Delete</button>
              </section>
          )}
      </div>
  );
  
}

export default ViewCreator;

    