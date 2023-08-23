import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]); // Store all posts from API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store filtered posts

  const getApi = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleSearch = () => {
    // Filter posts based on the search term
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="search-container">
        <input className="search-input" onChange={handleChange} value={search} placeholder="Enter search text" />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="posts-container">
        {(search !== '' ? filteredPosts : posts).map(post => (
          <div className="post" key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
