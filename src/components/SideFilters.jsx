import React, { useState } from 'react';

export default function SideFilters({ onCreate, title, items, labels }) {
  const [active, setActive] = useState(items[0].name);
  const [checked, setChecked] = useState({ [labels.items[1].name]: true });
  return (
    <aside className="side-col">
      <button className="btn-create" onClick={onCreate}>+Create ticket</button>
      <div className="side-card">
        <div className="side-title">{title}</div>
        {items.map((it) => (
          <button key={it.name} className={`side-item ${active === it.name ? 'on' : ''}`} onClick={() => setActive(it.name)}>
            <span>{it.name}</span>
            <em className={active === it.name ? 'pill' : ''}>{it.count}</em>
          </button>
        ))}
      </div>
      <div className="side-card">
        <div className="side-title">{labels.title}</div>
        {labels.items.map((l) => (
          <label key={l.name} className="side-label">
            <input type="checkbox" checked={!!checked[l.name]} onChange={() => setChecked({ ...checked, [l.name]: !checked[l.name] })} />
            <i style={{ background: l.color }} />{l.name}
          </label>
        ))}
      </div>
    </aside>
  );
}
