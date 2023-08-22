import { useState, useEffect } from 'react';
import { useRoutes, Link, BrowserRouter as Router} from 'react-router-dom'; 
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import { supabase } from './client';
import './App.css';

function RoutesComponent({ creators }) {
  return useRoutes([
    { path: '/', element: <ShowCreators creators={creators} /> },
    { path: '/view/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/add', element: <AddCreator /> },
  ]);
}

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*');
      if (data) setCreators(data);
      if (error) console.error('Error fetching data: ', error);
    }
    
    fetchCreators();
  }, []);

  return (
    <Router>
      <div className="App">
          <h1>Welcome to Creatorverse</h1>
          <RoutesComponent creators={creators} />
          <Link to="/add" className='add-button'>Add a Content Creator</Link>
          <Link to="/" className='back-home'>Back to Home</Link>
      </div>
    </Router>
  );
}

export default App;



