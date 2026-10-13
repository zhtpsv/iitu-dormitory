import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from '../components/Icons.jsx';

export default function Login({ role, onDone }) {
  const nav = useNavigate();
  const [iin, setIin] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = 
  
  
  useState(false);
  const [err, setErr] = useState('');
  const valid = iin.length > 0 && pw.length > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!iin) return setErr('Введите ИИН');
    if (!pw) return setErr('Введите пароль');
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('iitu_user') || 'null'); } catch { /* ignore */ }
    if (saved && saved.iin === iin && saved.pw && saved.pw !== pw) return setErr('Неверный пароль');
    setErr('');
    onDone(role);
    nav(role === 'admin' ? '/' : '/student');
  };

  return (
    <div className="login-page">
      <span className="logo-dot" />
      <form className="login-card" onSubmit={submit}>
        <h2>Sign in as {role === 'admin' ? 'Admin' : 'Student'}</h2>
        <div className="field">
          <label>Enter IIN</label>
          <input value={iin} onChange={(e) => setIin(e.target.value.replace(/\D/g, '').slice(0, 12))} inputMode="numeric" />
        </div>
        <div className="field">
          <label>
            <span>Your password</span>
            <button type="button" className="hide-btn" onClick={() => setShow(!show)}>
              <Eye off={!show} /> {show ? 'Hide' : 'Show'}
            </button>
          </label>
          <input value={pw} onChange={(e) => setPw(e.target.value)} type={show ? 'text' : 'password'} />
        </div>
        {err && <div className="error" style={{ margin: '0 0 10px' }}>{err}</div>}
        <button type="submit" className={`btn-pill ${valid ? 'active' : ''}`}>Log in</button>
        <a href="#" className="forgot link-u">Forget your password</a>
      </form>
      <div className="or-line">New to our community</div>
      <Link to="/register" className="btn-outline">Create an account</Link>
      <Link to="/role" className="link-u change-role">Change role</Link>
    </div>
  );
}
