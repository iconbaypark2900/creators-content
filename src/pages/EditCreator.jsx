import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      description: '',
      imageURL: ''
    });
  
    const { id  } = useParams(); // Get the ID from the URL.
    const navigate = useNavigate();
 
    useEffect(() => {
        async function fetchCreator() {
          const { data, error } = await supabase
            .from('content_creators')
            .select('*')
            .eq('id', id)
            .single();
    
          if (data) {
            setFormData(data);
          } else {
            console.error('Error fetching creator:', error.message);
          }
        }
    
        fetchCreator();
      }, [id]);
      
async function handleUpdateCreator(event) {
    event.preventDefault();
    
    const { data, error } = await supabase
        .from('content_creators')
        .update(formData)
        .eq('id', id);
    
        if (data && data.length > 0) {
          alert('Creator added successfully!');
          setFormData({
              name: '',
              url: '',
              description: '',
              imageURL: ''
          });
      } else if (error) {
          console.error('Error adding creator:', error);
          alert('Error adding creator:', error.message);
      } else {
          console.error('Unexpected behavior: No data or error returned from Supabase.');
          alert('An unexpected error occurred.');
      }
      
}

async function handleDelete() {
  if (window.confirm('Are you sure you want to delete this creator? This action cannot be undone.')) {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) {
      console.error('Error deleting creator:', error);
      alert('Failed to delete creator. Please try again later.');
    } else {
      alert('Creator successfully deleted.');
      // After successful deletion, redirect to the main page
      // Assuming you're using 'react-router-dom'
      navigate('/');
    }
  }
}

return (
    <div>
      <h2>Edit Content Creator</h2>
      <form onSubmit={handleUpdateCreator}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input 
            type="url" 
            value={formData.url} 
            onChange={e => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={formData.description} 
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <label>Image URL (optional):</label>
          <input 
            type="url" 
            value={formData.imageURL} 
            onChange={e => setFormData({ ...formData, imageURL: e.target.value })}
          />
        </div>
        <button type="submit">Update Creator</button>
        <button onClick={handleDelete}>Delete Creator</button>
        <Link to="/">Back to Creators List</Link>
      </form>
    </div>
  );
}

export default EditCreator;

       