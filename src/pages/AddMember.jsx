import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Chevron } from '../components/Icons.jsx';

const palette = ['#2f7d4f', '#3b6ea5', '#c0577a', '#7a6a58', '#8a7f9c', '#a0643c', '#2c5b6e'];

export default function AddMember({ onAdd }) {
  const nav = useNavigate();
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', position: '', gender: 'Male' });
  const [photo, setPhoto] = useState(null);
  const [toast, setToast] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const pick = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.first || !f.email) { setToast('Укажите имя и email'); setTimeout(() => setToast(''), 2000); return; }
    onAdd({
      id: Date.now(), name: f.first, role: f.position || 'Admin', email: f.email,
      color: palette[Math.floor(Math.random() * palette.length)], photo,
    });
    nav('/team');
  };

  return (
    <>
      <h1 className="title">Add Team Member</h1>
      <form className="form-card" onSubmit={submit}>
        <div className="upload">
          <label htmlFor="photo">
            <span className="cam">{photo ? <img src={photo} alt="" /> : <Camera />}</span>
            Upload Photo
          </label>
          <input id="photo" type="file" accept="image/*" hidden onChange={pick} />
        </div>

        <div className="form-grid">
          <div className="fg"><label>First Name</label><input placeholder="Enter your first name" value={f.first} onChange={set('first')} /></div>
          <div className="fg"><label>Last Name</label><input placeholder="Enter your last name" value={f.last} onChange={set('last')} /></div>
          <div className="fg"><label>Your email</label><input type="email" placeholder="Enter your email" value={f.email} onChange={set('email')} /></div>
          <div className="fg"><label>Phone Number</label><input placeholder="Enter your phone number" value={f.phone} onChange={set('phone')} /></div>
          <div className="fg"><label>Position</label><input placeholder="CEO" value={f.position} onChange={set('position')} /></div>
          <div className="fg sm"><label>Gender</label>
            <select value={f.gender} onChange={set('gender')}><option>Male</option><option>Female</option></select>
          </div>
        </div>

        <div className="form-actions"><button type="submit">Add Now</button></div>
      </form>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
