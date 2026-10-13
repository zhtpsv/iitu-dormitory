import React, { useState } from 'react';
import SideFilters from '../../components/SideFilters.jsx';
import { Camera } from '../../components/Icons.jsx';
import useToast from '../../components/useToast.jsx';

const categories = ['Сантехника / Plumbing', 'Электрика / Electrical', 'Мебель / Furniture', 'Уборка / Cleaning', 'Другое / Other'];
const labels = {
  title: 'LABEL',
  items: [
    { name: 'Bug Report', color: '#2ed3b7' }, { name: 'Complaint', color: '#5a9bff' },
    { name: 'Request', color: '#ff8a3d' }, { name: 'Questions', color: '#b36bff' },
  ],
};
const empty = { category: categories[0], room: '', text: '' };

export default function Feedback() {
  const [f, setF] = useState(empty);
  const [photo, setPhoto] = useState(null);
  const [sent, setSent] = useState(0);
  const [toast, show] = useToast();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const items = [
    { name: 'Mail', count: '1253' }, { name: 'In progress', count: String(18 + sent) }, { name: 'Closed', count: '24,532' },
    { name: 'On Hold', count: '14' }, { name: 'Bin', count: '9' },
  ];
  const focusForm = () => document.getElementById('room')?.focus();

  const submit = (e) => {
    e.preventDefault();
    if (!f.room.trim()) return show('Укажите комнату или блок');
    if (f.text.trim().length < 10) return show('Опишите проблему подробнее');
    setSent(sent + 1); setF(empty); setPhoto(null);
    show('Ticket sent');
  };

  return (
    <>
      <h1 className="title">Feedback Management</h1>
      <div className="split">
        <SideFilters title="MY REQUEST" items={items} labels={labels} onCreate={focusForm} />
        <form className="panel fb-form" onSubmit={submit}>
          <div className="upload">
            <label htmlFor="evidence">
              <span className="cam big">{photo ? <img src={photo} alt="" /> : <Camera />}</span>
              Upload Photo / Evidence
            </label>
            <input id="evidence" type="file" accept="image/*" hidden
              onChange={(e) => e.target.files[0] && setPhoto(URL.createObjectURL(e.target.files[0]))} />
          </div>
          <div className="fb-row">
            <div className="fg"><label>CATEGORY</label>
              <select value={f.category} onChange={set('category')}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div className="fg"><label>ROOM / BLOCK</label>
              <input id="room" placeholder="Например: Блок А, комната 405" value={f.room} onChange={set('room')} />
            </div>
          </div>
          <div className="fg"><label>PROBLEM DESCRIPTION</label>
            <textarea placeholder="Опишите подробно проблему, что именно сломалось..." value={f.text} onChange={set('text')} />
          </div>
          <div className="right center"><button type="submit" className="btn-action wide">Send Ticket</button></div>
        </form>
      </div>
      {toast}
    </>
  );
}
