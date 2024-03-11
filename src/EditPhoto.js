import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPhoto.css'; 

function App() {
  const [photos, setPhotos] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: '',
    comment: '',
    img: null 
  });
  const [editPhotoId, setEditPhotoId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9001/photos')
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  const handleEditChange = event => {
    if (event.target.name === 'img') {
      setEditFormData({ ...editFormData, img: event.target.files[0] });
    } else {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setEditFormData({ ...editFormData, [fieldName]: fieldValue });
    }
  };

  const handleEditFormSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', editFormData.name);
    formData.append('comment', editFormData.comment);
    formData.append('file', editFormData.img); 

    axios.put(`http://localhost:9001/photos/${editPhotoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating photo:', error);
      });
  };

  const handleEditClick = (event, photo) => {
    event.preventDefault();
    setEditPhotoId(photo.id);
    const formValues = {
      name: photo.name,
      comment: photo.comment,
    };
    setEditFormData(formValues);
  };

  const handleDeleteClick = (event, id) => {
    event.preventDefault();

    axios.delete(`http://localhost:9001/photos/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  return (
    <div className="container"> 
      <h1>Edit Post</h1>
      <ul className="photo-list"> 
        {photos.map(photo => (
          <li key={photo.id} className="photo-item"> 
            <div className="photo-details">
              <span className="detail"><b>Name: </b>{photo.name}</span>
              &nbsp;<br></br>
              <span className="detail"><b>Caption: </b> {photo.comment}</span>
             <center><img src={`data:image/jpeg;base64,${photo.img}`} alt=" " className="photo" /> </center>
            </div>
            <button className="edit-button" onClick={event => handleEditClick(event, photo)}>Edit</button> 
            <button className="delete-button" onClick={event => handleDeleteClick(event, photo.id)}>Delete</button> 
          </li>
        ))}
      </ul>
      {editPhotoId && (
        <form onSubmit={handleEditFormSubmit} className="edit-form"> 
          <h2>Edit Photo</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            className="edit-input"
          />
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={editFormData.comment}
            onChange={handleEditChange}
            className="edit-input"
          />
          <label htmlFor="img">Image:</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={handleEditChange}
            className="edit-input"
          />
          <button type="submit" className="update-button">Update</button> 
        </form>
      )}
    </div>
  );
}

export default App;
