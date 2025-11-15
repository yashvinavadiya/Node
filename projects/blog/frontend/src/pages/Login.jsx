import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('sessionId', res.data.sessionId);
      setUser(res.data.user);
      nav('/dashboard');
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #d6a198ff, #9e8a8fff)',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(14px)',
          borderRadius: '16px',
          padding: '30px',
          color: '#fff',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '700',
            letterSpacing: '1px'
          }}
        >
          Welcome Back!
        </h2>

        {err && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              background: 'rgba(255, 0, 0, 0.35)',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600'
            }}
          >
            {err}
          </div>
        )}

        <form onSubmit={submit}>
          {/* Email */}
          <label style={{ fontWeight: '600' }}>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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

          {/* Password */}
          <label style={{ fontWeight: '600' }}>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '22px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '15px'
            }}
          />

          {/* Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #24c6dc, #514a9d)',
              fontSize: '17px',
              fontWeight: '700',
              color: 'white',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
