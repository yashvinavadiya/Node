import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg('Passwords do not match');
      return;
    }

    try {
      await API.post('/auth/register', { name, email, password });
      setMsg('Registered successfully! Redirecting to login...');
      setTimeout(() => nav('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8157adff, #436eb9ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '30px',
          color: '#fff',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>
          Create an Account
        </h2>

        {msg && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              background: msg.includes('successfully')
                ? 'rgba(0, 255, 135, 0.3)'
                : 'rgba(255, 0, 0, 0.3)',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600'
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={submit}>
          {/* Input Box */}
          <label style={{ fontWeight: '600' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '8px 0 16px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '15px'
            }}
          />

          <label style={{ fontWeight: '600' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '8px 0 16px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '15px'
            }}
          />

          <label style={{ fontWeight: '600' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '8px 0 16px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '15px'
            }}
          />

          <label style={{ fontWeight: '600' }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            style={{
              width: '100%',
              padding: '12px',
              margin: '8px 0 20px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              fontSize: '15px'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6a00, #ee0979)',
              fontSize: '17px',
              fontWeight: '700',
              color: 'white',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
