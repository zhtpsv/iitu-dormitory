import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cubes from '../components/Cubes.jsx';

export default function RoleSelect({ onPick }) {
  const nav = useNavigate();
  const pick = (role) => { onPick(role); nav('/login'); };
  return (
    <div className="reg-page">
      <div className="reg-left">
        <span className="logo-dot" />
        <div className="reg-form">
          <h1>Welcome to IITU Dormitory</h1>
          <p className="sub">Choose how you want to sign in</p>
          <div className="role-btns">
            <button className="btn-pill soft" onClick={() => pick('student')}>Student</button>
            <button className="btn-pill active" onClick={() => pick('admin')}>Admin</button>
          </div>
        </div>
      </div>
      <div className="reg-right"><Cubes /></div>
    </div>
  );
}
