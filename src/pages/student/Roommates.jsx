import React, { useState } from 'react';
import useToast from '../../components/useToast.jsx';

const people = [
  { id: 1, ini: 'АМ', name: 'Алихан Марат', fac: 'Информационные системы', course: 2, match: 94, tags: ['Не курит', 'Сова', 'Тихо слушает музыку'], g: ['#5b8cff', '#7a6cf0'] },
  { id: 2, ini: 'ТБ', name: 'Тимур Бейсен', fac: 'Кибербезопасность', course: 2, match: 88, tags: ['Чистюля', 'Жаворонок', 'Геймер'], g: ['#ff7a59', '#f0508a'] },
  { id: 3, ini: 'РС', name: 'Расул Смагулов', fac: 'Software Engineering', course: 2, match: 75, tags: ['Спортсмен', 'Программист'], g: ['#8b5cf6', '#6d4ae0'] },
  { id: 4, ini: 'ДК', name: 'Данияр Каримов', fac: 'Информационные системы', course: 2, match: 91, tags: ['Спокойный', 'Учится по вечерам'], g: ['#1fc7a0', '#16a085'] },
];
const ALL = 'Все факультеты';
const faculties = [ALL, ...new Set(people.map((p) => p.fac))];

export default function Roommates() {
  const [fac, setFac] = useState(ALL);
  const [liked, setLiked] = useState({});
  const [open, setOpen] = useState(null);
  const [toast, show] = useToast();
  const list = people.filter((p) => fac === ALL || p.fac === fac);

  const like = (p) => {
    const on = !liked[p.id];
    setLiked({ ...liked, [p.id]: on });
    show(on ? `${p.name} добавлен в предпочтения` : `${p.name} убран из предпочтений`);
  };

  return (
    <>
      <div className="rm-head">
        <h1 className="title">Roommate Matching</h1>
        <select className="select wide-select" value={fac} onChange={(e) => setFac(e.target.value)}>
          {faculties.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
      <p className="hint">Подберите соседа по комнате на основе ваших интересов и режима</p>
      <div className="rm-grid">
        {list.map((p) => (
          <div className="rm-card" key={p.id}>
            <div className="rm-top">
              <span className="avatar big" style={{ background: `linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})` }}>{p.ini}</span>
              <div><b>{p.name}</b><small>{p.fac} • {p.course} курс</small></div>
              <span className={`chip ${p.match >= 90 ? 'ok' : p.match >= 80 ? 'ok' : 'info'}`}>{p.match}% совпадение</span>
            </div>
            <div className="tags">{p.tags.map((t) => <span key={t}># {t}</span>)}</div>
            {open === p.id && (
              <p className="rm-about">Режим и интересы: {p.tags.join(', ').toLowerCase()}. Совпадение с вашей анкетой — {p.match}%.</p>
            )}
            <div className="rm-actions">
              <button className="btn-ghost" onClick={() => setOpen(open === p.id ? null : p.id)}>Профиль</button>
              <button className={`btn-action fill ${liked[p.id] ? 'liked' : ''}`} onClick={() => like(p)}>
                {liked[p.id] ? '✓ Предпочтение' : 'Предпочтение'}
              </button>
            </div>
          </div>
        ))}
        {!list.length && <div className="placeholder">На этом факультете пока нет подходящих соседей.</div>}
      </div>
      {toast}
    </>
  );
}
