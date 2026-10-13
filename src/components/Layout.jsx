import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bed, Bell, Burger, Chat, Chevron, Cube, Doc, Gear, Grid, Layers, Power, Search, User, Users } from './Icons.jsx';

const NAV = {
  admin: [
    { to: '/', icon: <Grid />, cls: 'dash', end: true },
    { to: '/rooms', icon: <Cube /> },
    { gap: true },
    { to: '/messages', icon: <Chat /> },
    { to: '/complaints', icon: <Layers /> },
    { to: '/students', icon: <Users /> },
    { to: '/team', icon: <User /> },
    { to: '/settings', icon: <Gear /> },
  ],
  student: [
    { to: '/student/documents', icon: <Doc />, label: 'Documents' },
    { to: '/student/feedback', icon: <Chat />, label: 'Feedback' },
    { to: '/student/room', icon: <Bed />, label: 'Room selection' },
    { to: '/student/roommates', icon: <Users />, label: 'Roommates' },
  ],
};

export default function Layout({ role = 'admin', onLogout }) {
  const items = NAV[role];
  return (
    <div className="app">
      <aside className="sidebar">
        <button className="burger" aria-label="menu"><Burger /></button>
        {items.map((it, i) =>
          it.gap ? (
            <div className="nav-gap" key={i} />
          ) : (
            <NavLink key={it.to} to={it.to} end={it.end} title={it.label} aria-label={it.label}
              className={({ isActive }) => `nav-item ${it.cls || ''} ${isActive ? 'active' : ''}`}>
              {it.icon}
            </NavLink>
          )
        )}
        <div className="nav-spacer" />
        <button className="logout" onClick={onLogout} aria-label="logout"><Power /></button>
      </aside>

      <div className="main">
        <header className="topbar">
          <label className="search">
            <Search />
            <input placeholder="Search" />
          </label>
          <div className="top-right">
            <span className="bell"><Bell /><span className="badge">6</span></span>
            <div className="user">
              <span className="avatar" style={{ background: 'linear-gradient(135deg,#c0577a,#7a3b6e)' }}>Z</span>
              <div className="meta"><b>Zhansaya</b><small>{role === 'admin' ? 'Admin' : 'Student'}</small></div>
              <span className="chev"><Chevron size={9} /></span>
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
