import { useState } from 'react';
import { supabase } from '../client';

function AddCreator() {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: '',
        youtube: '',
        instagram: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleAddCreator(event) {
        event.preventDefault();
    
        const { error } = await supabase.from('creators').insert([formData]);
        
        if (error) {
            console.error('There was an error adding the creator:', error);
            alert('Error adding creator: ' + error.message);
        } else {
            alert('Creator added successfully!');
            window.location = "/";
        }
    }
      
    return (
        <div className="form-container">
            <h2>Add a New Content Creator</h2>
            <form onSubmit={handleAddCreator} className="creator-form">
                {/* Other form inputs, similar to the example */}
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    required
                />
                <label>URL:</label>
                <input 
                    type="url"
                    name="url"
                    value={formData.url} 
                    onChange={handleChange}
                    required
                />
                <label>Description</label>
                <input 
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    required
                    />
                <label>Image (Optional)</label>
                <input 
                    type=''
                    name='image'
                    value={formData.imageURL}
                    onChange={handleChange}
                  />
                <label>Youtube</label>
                <input 
                    type='url'
                    name='youtube'
                    value={formData.youtube}
                    onChange={handleChange}
                />
                <label>Instagram</label>
                <input 
                    type='url'
                    name='instagram'
                    value={formData.instagram}
                    onChange={handleChange}
                />
                <button type="submit" className="submit-button">Add Creator</button>
            </form>
        </div>
    );
}

export default AddCreator;
