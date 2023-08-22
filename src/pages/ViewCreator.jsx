import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorInfo from '../components/CreatorInfo';

function ViewCreator() {
    const [creator, setCreator] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      async function fetchCreator() {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single(); // This gets only one record
  
        if (data) setCreator(data);
        if (error) console.error('Error fetching creator: ', error);
      }
  
      fetchCreator();
    }, [id]);

    if (!creator) {
        return <div>Loading...</div>;
    }
    
        return (
        <>
        {/* <div className="single-creator-view"> */}
            {/* <CreatorInfo creator={creator} /> */}
          {/* </div> */}
          <div className="single-creator-view">
              <CreatorInfo creator={creator} />
              <Link to={`/edit/${creator.id}`}>Edit Creator</Link>
            </div>
            </>
    );
}
    
export default ViewCreator;
    