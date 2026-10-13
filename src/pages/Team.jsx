import React from 'react';
import { Link } from 'react-router-dom';

export default function Team({ team }) {
  return (
    <>
      <div className="team-head">
        <h1>Team</h1>
        <Link to="/team/new" className="btn-blue">Add New Member</Link>
      </div>
      <div className="team-grid">
        {team.map((m) => (
          <div className="member" key={m.id}>
            {m.photo ? (
              <img src={m.photo} alt={m.name} className="avatar" style={{ width: 72, height: 72, margin: '0 auto 14px', display: 'block', objectFit: 'cover' }} />
            ) : (
              <div className="avatar" style={{ background: m.color }}>{m.name[0]}</div>
            )}
            <b>{m.name}</b>
            <span>{m.role}</span>
            <small>{m.email}</small>
          </div>
        ))}
      </div>
    </>
  );
}
