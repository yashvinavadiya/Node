import React, { useState, useEffect } from 'react';
import API from '../api';
import PostForm from './PostForm';

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const load = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saved = (post) => {
    setPosts((prev) => {
      const exists = prev.find((p) => p._id === post._id);
      if (exists) return prev.map((p) => (p._id === post._id ? post : p));
      return [post, ...prev];
    });
    setEditingPost(null);
  };

  const del = async (id) => {
    try {
      await API.delete('/posts/' + id);
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (post) => {
    setEditingPost(post);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #7F00FF, #E100FF)",
        color: "#fff"
      }}
    >
      {/* Dashboard Container */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "700",
            letterSpacing: "1px"
          }}
        >
          Dashboard – {user.name}
        </h2>

        {/* Post Form */}
        <PostForm onSaved={saved} post={editingPost} />

        {/* Post List */}
        <h3 style={{ marginTop: "25px", marginBottom: "15px" }}>Your Posts</h3>

        <ul style={{ padding: "0", listStyle: "none" }}>
          {posts.map((p) => (
            <li
              key={p._id}
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ maxWidth: "70%" }}>
                <div style={{ fontSize: "20px", fontWeight: "700" }}>
                  {p.title}
                </div>
                <div style={{ opacity: 0.9 }}>{p.content}</div>
              </div>

              <div style={{ whiteSpace: "nowrap" }}>
                {/* Edit Button */}
                <button
                  style={{
                    padding: "8px 12px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #f7971e, #ffd200)",
                    color: "#000",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={() => edit(p)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={() => del(p._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
