import { useState, useEffect } from 'react'

import { useRoutes, Link } from 'react-router-dom'; 
import {ShowCreators } from './pages/ShowCreators';
import { ViewCreator } from './pages/ViewCreator';
import { EditCreator } from './pages/EditCreator';
import { AddCreator } from './pages/AddCreator';
import { supabase } from './client';

import './App.css'

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from('content_creators').select('*');
      if (data) setCreators(data);
      if(error) console.error('Error fetching data: ', error);
    }
    
    fetchCreators();
  }, []);

  let routedElement = useRoutes([
    { path: '/', element: <ShowCreators creators = {creators} />},
    { path: '/view/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/add', elemet: <AddCreator /> },
  ]);

  return (
    <div className="App">
        <h1>Welcome to Creatorverse</h1>
        {routedElement}
        <Link to="/add" className='add-button'>Add a Content Creator</Link>

        <ShowCreators creators={creators}/>
    </div>
  );
}

export default App;
