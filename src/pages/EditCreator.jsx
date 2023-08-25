import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Modal from 'react-modal';

function EditCreator({ data = [] }) {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      description: '',
      imageURL: '',
      youtube: '',
      twitter: '',
      instagram: '',
    });
    const [modalIsOpen, setIsOpen] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0];
        setFormData(result);
    }, [data, id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleUpdateCreator(event) {
        event.preventDefault();

        const { error } = await supabase
            .from('creators')
            .update(formData)
            .eq('id', id);

        if (error) {
            console.error('Error updating creator:', error);
            alert('Error updating creator: ' + error.message);
        } else {
            alert('Creator updated successfully!');
            window.location = "/";
        }
    }

    async function handleDelete() {
        const { error } = await supabase.from('creators').delete().eq('id', id);
        if (error) {
            console.error('Error deleting creator:', error);
            alert('Failed to delete creator. Please try again later.');
        } else {
            alert('Creator successfully deleted.');
            window.location = "/";
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
      <div className="AddEditCreator">
  
          <form>
              <label>Name</label>
              <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
              />
  
              <label>
                  Image
                  <p>Provide a link to an image of your creator. Be sure to include the http://</p>
              </label>
              <input 
                  type="text" 
                  id="image" 
                  name="imageURL" 
                  value={formData.imageURL} 
                  onChange={handleChange} 
                  required 
              />
  
              <label>
                  Description
                  <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
              </label>
              <textarea 
                  name="description" 
                  rows="3" 
                  cols="50" 
                  id="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required
              ></textarea>
  
              <h3>Social Media Links</h3>
              <p>Provide at least one of the creator's social media links.</p>
  
              <label>
                  YouTube
                  <p>The creator's YouTube handle (without the @)</p>
              </label>
              <input 
                  type="text" 
                  id="youtube" 
                  name="youtube" 
                  value={formData.youtube} 
                  onChange={handleChange} 
              />
  
              <label>
                  Twitter
                  <p>The creator's Twitter handle (without the @)</p>
              </label>
              <input 
                  type="text" 
                  id="twitter" 
                  name="twitter" 
                  value={formData.twitter} 
                  onChange={handleChange} 
              />
  
              <label>
                  Instagram
                  <p>The creator's Instagram handle (without the @)</p>
              </label>
              <input 
                  type="text" 
                  id="instagram" 
                  name="instagram" 
                  value={formData.instagram} 
                  onChange={handleChange} 
              />
  
              <div className="submit-or-delete">
                  <button type="submit" onClick={handleUpdateCreator}>Update</button>
                  <button onClick={openModal} className="delete-button">Delete</button>
              </div>
          </form>
  
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Delete Confirmation"
              className="delete-modal"
              overlayClassName="overlay"
          >
              <h2>⚠️ WAIT!!!! ⚠️</h2>
              <p>Are you sure you want to delete {formData.name}?</p>
              <button onClick={closeModal}>Nah, never mind</button>
              <button onClick={handleDelete}>YES! Totally sure</button>
          </Modal>
      </div>
  );
  
}

export default EditCreator;
