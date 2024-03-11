import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/photos');
        const jsonData = await response.json();
        const postsWithLikes = jsonData.map(post => ({ ...post, likes: post.likes || 0, commentInput: '' }));
        setData(postsWithLikes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id) => {
    setData(prevData => prevData.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      } else {
        return post;
      }
    }));
  };

  const handleCommentChange = (id, event) => {
    const newCommentInput = event.target.value;
    setData(prevData => prevData.map(post => {
      if (post.id === id) {
        return { ...post, commentInput: newCommentInput };
      } else {
        return post;
      }
    }));
  };

  const handleCommentPost = async (id) => {
    try {
      const commentToPost = data.find(post => post.id === id).commentInput;
      const response = await fetch(`http://localhost:9001/photos/${id}?comment1=${encodeURIComponent(commentToPost)}`, {
        method: 'PUT',
      });
      if (response.ok) {
        setData(prevData => prevData.map(post => {
          if (post.id === id) {
            return { ...post, comment1: commentToPost, commentInput: '' };
          } else {
            return post;
          }
        }));

        const updatedResponse = await fetch('http://localhost:9001/photos');
        const updatedData = await updatedResponse.json();
        const postsWithLikes = updatedData.map(post => ({ ...post, likes: post.likes || 0, commentInput: '' }));
        setData(postsWithLikes);
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="container">
      <h1>News Feed</h1>
      {data.map(post => (
        <div key={post.id} className="post">
          <img src={`data:image/jpeg;base64,${post.img}`} alt="Post" className="post-image" />
          <div className="post-details">
            <h2>{post.name}</h2>
            <p>{post.comment}</p>
            <center><p>{post.comment1}</p></center>
            <div className="actions-container">
              <div className="like-container">
                <button onClick={() => handleLike(post.id)} className="like-button">
                  <i className="fa fa-thumbs-up"></i> Like
                </button>
                <span className="like-count">{`${post.likes} ${post.likes === 1 ? 'person' : 'people'} liked this pic`}</span>
              </div>
              <center>
                <div className="comment-container">
                  <input
                    type="text"
                    value={post.commentInput}
                    onChange={(event) => handleCommentChange(post.id, event)}
                    placeholder="Add a comment"
                    className="comment-input"
                  />
                  <button onClick={() => handleCommentPost(post.id)} className="comment-button">
                    Post
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
