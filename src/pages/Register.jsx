import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from '../components/Icons.jsx';
import Cubes from '../components/Cubes.jsx';

const rules = [
  ['Use 8 or more characters', (v) => v.length >= 8],
  ['One Uppercase character', (v) => /[A-Z]/.test(v)],
  ['One lowercase character', (v) => /[a-z]/.test(v)],
  ['One special character', (v) => /[^A-Za-z0-9]/.test(v)],
  ['One number', (v) => /\d/.test(v)],
];

export default function Register({ role, onDone }) {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [iin, setIin] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const iinOk = /^\d{12}$/.test(iin);
  const pwOk = rules.every(([, t]) => t(pw));
  const valid = emailOk && iinOk && pwOk;
   
  const submit = (e) => {
    e.preventDefault();
    if (!emailOk) return setErr('Введите корректный email (лучше на dormitory.iitu.edu.kz)');
    if (!iinOk) return setErr('ИИН должен состоять из 12 цифр (сейчас ' + iin.length + ')');
    if (!pwOk) return setErr('Пароль должен выполнять все 5 правил ниже');
    setErr('');
    localStorage.setItem('iitu_user', JSON.stringify({ email, iin, pw, role }));
    onDone(role);
    nav(role === 'admin' ? '/' : '/student');
  };

  return (
    <div className="reg-page">
      <div className="reg-left">
        <span className="logo-dot" />
        <form className="reg-form" onSubmit={submit}>
          <h1>Welcome to IITU Dormitory</h1>
          <p className="sub" style={{ marginTop: -6 }}>Registering as <b>{role === 'admin' ? 'Admin' : 'Student'}</b> · <Link to="/role" className="link-u">change</Link></p>
          <p className="sub">Already have an account? <Link to="/login" className="link-u">Log in</Link></p>

          <div className="field">
            <label>Email(use dormitory.iitu.edu.kz)</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="field">
            <label>IIN</label>
            <input value={iin} onChange={(e) => setIin(e.target.value.replace(/\D/g, '').slice(0, 12))} inputMode="numeric" />
          </div>
          <div className="field">
            <label>
              <span>Password</span>
              <button type="button" className="hide-btn" onClick={() => setShow(!show)}>
                <Eye off={!show} /> {show ? 'Hide' : 'Show'}
              </button>
            </label>
            <input value={pw} onChange={(e) => setPw(e.target.value)} type={show ? 'text' : 'password'} />
          </div>
          <div className="rules">
            {rules.map(([label, t]) => (
              <span key={label} className={t(pw) ? 'ok' : ''}>{label}</span>
            ))}
          </div>

          {err && <div className="error">{err}</div>}
          <p className="terms">By creating an account, you agree to the <a href="#" className="link-u">Terms of use</a> and <a href="#" className="link-u">Privacy Policy.</a></p>
          <button className={`btn-pill ${valid ? 'active' : ''}`} type="submit">Create an account</button>
          <p className="bottom">Already have an account? <Link to="/login" className="link-u">Log in</Link></p>
        </form>
      </div>
      <div className="reg-right"><Cubes /></div>
    </div>
  );
}
