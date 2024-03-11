import React, { useState } from 'react';
import axios from 'axios';

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('comment', comment);

    try {
      await axios.post('http://localhost:9001/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFile(null);
      setName('');
      setComment('');
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo.');
    }
  };


  return (
    <center>
      <div style={styles.container}>
        <h2 style={styles.title}>Upload Post</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Caption:</label>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Choose File:</label>
            <input type="file" onChange={handleFileChange} style={styles.fileInput} />
          </div>
          <button type="submit" style={styles.button}>Upload</button>
        </form>
      </div>
    </center>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  fileInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1877f2',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
};

export default UploadPhoto;
