import { useState } from 'react';
import { supabase } from '../client';

function AddCreator() {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      description: '',
      imageURL: ''
    });

async function handleAddCreator(event) {
    event.preventDefault();
    
    const { data, error } = await supabase
        .from('creators')
      .insert([formData]);
    
    if (data) {
        alert('Creator added successfully!');
      // Optionally, you could redirect the user or clear the form here
      setFormData({
        name: '',
        url: '',
        description: '',
        imageURL: ''
      });
    } else {
        alert('Error adding creator:', error.message);
    }
}    

return (
    <div>
      <h2>Add a New Content Creator</h2>
      <form onSubmit={handleAddCreator}>
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
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}

export default AddCreator;
