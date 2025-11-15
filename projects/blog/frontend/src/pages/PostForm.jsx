import React, { useState, useEffect } from 'react';
import API from '../api';

export default function PostForm({ onSaved, post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (post?._id) {
        res = await API.put('/posts/' + post._id, { title, content });
      } else {
        res = await API.post('/posts', { title, content });
      }
      onSaved(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255,255,255,0.15)',
        padding: '25px',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
        marginBottom: '20px',
        color: '#fff'
      }}
    >
      <h3
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: '700'
        }}
      >
        {post?._id ? 'Edit Post' : 'Create New Post'}
      </h3>

      {/* Title */}
      <label style={{ fontWeight: '600' }}>Title</label>
      <input
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          fontSize: '15px'
        }}
      />

      {/* Content */}
      <label style={{ fontWeight: '600' }}>Content</label>
      <textarea
        placeholder="Enter post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        required
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: '15px'
        }}
      />

      {/* Button */}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: 'none',
          background: post?._id
            ? 'linear-gradient(135deg, #ff512f, #dd2476)'
            : 'linear-gradient(135deg, #00c6ff, #0072ff)',
          color: '#fff',
          fontSize: '17px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: '0.3s',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
        }}
        onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
      >
        {post?._id ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
}
