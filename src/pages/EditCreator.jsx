import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      description: '',
      imageURL: ''
    });
  
    const { id } = useParams(); // Get the ID from the URL.
 
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
    
    if (data) {
      alert('Creator updated successfully!');
        // Optionally, redirect the user or provide further feedback here.
    } else {
      alert('Error updating creator:', error.message);
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
      </form>
    </div>
  );
}

export default EditCreator;

       