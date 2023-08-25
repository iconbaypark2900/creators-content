import React, { useState, useEffect } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
import { supabase } from './client';
import '@picocss/pico';
import './App.css';

const Routes = ({ creators }) => {
  return useRoutes([
    {
      path: "/",
      element: <ShowCreators data={creators} />
    },
    {
      path: "/edit/:id",
      element: <EditCreator data={creators} />
    },
    {
      path: "/new",
      element: <AddCreator />
    },
    {
      path: "/view/:id",
      element: <ViewCreator data={creators} />
    }
  ]);
}

const App = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select()
        .order('created_at', { ascending: true });

        console.log("Fetched creators: ", data);

      // Only set the state if the data has changed
      if (JSON.stringify(data) !== JSON.stringify(creators)) {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Creatorverse</h1>
          <nav>
            <ul>
              <li><a href="/" role="button">View All Creators</a></li>
              <li><a href="/new" role="button">Add a Creator</a></li>
            </ul>
          </nav>
        </header>
        
        <main><Routes creators={creators} /></main>
      </div>
    </BrowserRouter>
  );
};

export default App;


