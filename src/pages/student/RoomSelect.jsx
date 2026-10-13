import React, { useState } from 'react';
import useToast from '../../components/useToast.jsx';

const ME = { name: 'Дамир Жетписсов', initials: 'ДЖ' };
const t = (n) => (n % 2 ? 'НИЖНИЙ ЯРУС' : 'ВЕРХНИЙ ЯРУС');
const mk = (taken) => [1, 2, 3, 4].map((n) => ({ n, tier: t(n), who: taken[n] || null }));
const ivan = { name: 'Иван Иванов', meta: 'ИТУ • 2 курс', ini: 'ИИ' };

const blocks = [
  { id: 'A', name: 'Блок А (Мужской)', status: 'Свободно', room: 'Комната 302 (Блок А)', beds: mk({ 1: ivan }) },
  { id: 'B', name: 'Блок B (Мужской)', status: 'Мест нет', room: 'Комната 105 (Блок B)',
    beds: mk({ 1: ivan, 2: { name: 'Арман Сейт', meta: 'ИТУ • 1 курс', ini: 'АС' }, 3: { name: 'Нурлан Бек', meta: 'ИТУ • 3 курс', ini: 'НБ' }, 4: { name: 'Ерлан Ким', meta: 'ИТУ • 2 курс', ini: 'ЕК' } }) },
  { id: 'C', name: 'Блок C (Женский)', status: 'Частично', room: 'Комната 211 (Блок C)',
    beds: mk({ 1: { name: 'Алия Нур', meta: 'ИТУ • 2 курс', ini: 'АН' }, 3: { name: 'Мадина Ус', meta: 'ИТУ • 1 курс', ini: 'МУ' } }) },
];

export default function RoomSelect() {
  const [blockId, setBlockId] = useState('A');
  const [mine, setMine] = useState({ block: 'A', bed: 2 });
  const [confirmed, setConfirmed] = useState(false);
  const [toast, show] = useToast();
  const block = blocks.find((b) => b.id === blockId);
  const free = block.beds.filter((b) => !b.who).length;
  const isMine = (n) => mine && mine.block === blockId && mine.bed === n;

  const pick = (b) => { if (b.who) return; setMine({ block: blockId, bed: b.n }); setConfirmed(false); };
  const confirm = () => {
    if (!mine) return show('Сначала выберите место');
    setConfirmed(true); show('Место подтверждено');
  };

  return (
    <>
      <h1 className="title">Bed & Room Selection</h1>
      <div className="split room-split">
        <aside className="side-col">
          <div className="side-card">
            <div className="side-title">БЛОКИ ОБЩЕЖИТИЯ</div>
            {blocks.map((b) => (
              <button key={b.id} className={`side-item ${b.id === blockId ? 'on' : ''}`} onClick={() => setBlockId(b.id)}>
                <span>{b.name}</span>
                <em className={b.id === blockId ? 'pill' : ''}>{b.status}</em>
              </button>
            ))}
          </div>
          <div className="side-card">
            <div className="side-title">ЛЕГЕНДА МЕСТ</div>
            {[['#3b7bff', 'Выбрано вами'], ['#2ed39a', 'Свободно'], ['#d0d3da', 'Занято']].map(([c, l]) => (
              <div key={l} className="side-label"><i className="dot" style={{ background: c }} />{l}</div>
            ))}
          </div>
        </aside>
        <div className="panel">
          <div className="room-head">
            <div><h2>{block.room}</h2><small>4-местная стандартная секция</small></div>
            <span className={`chip ${free ? 'ok' : 'full'}`}>{free ? 'Доступно к заселению' : 'Мест нет'}</span>
          </div>
          <div className="beds">
            {block.beds.map((b) => (
              <button key={b.n} disabled={!!b.who} onClick={() => pick(b)}
                className={`bed ${b.who ? 'taken' : ''} ${isMine(b.n) ? 'mine' : ''}`}>
                <div className="bed-top">
                  <span>МЕСТО №{b.n} ({b.tier})</span>
                  <i className="dot" style={{ background: b.who ? '#d0d3da' : isMine(b.n) ? '#3b7bff' : '#2ed39a' }} />
                </div>
                {b.who ? (
                  <div className="bed-who"><span className="ini gray">{b.who.ini}</span><div><b>{b.who.name}</b><small>{b.who.meta}</small></div></div>
                ) : isMine(b.n) ? (
                  <div className="bed-who"><span className="ini blue">{ME.initials}</span><div><b className="navy">Вы ({ME.name})</b><small className="blue">Ваш текущий выбор</small></div></div>
                ) : (
                  <div><b className="green">Свободно</b><small>Нажмите, чтобы выбрать</small></div>
                )}
              </button>
            ))}
          </div>
          <div className="right">
            <button className="btn-action" onClick={confirm} disabled={confirmed}>{confirmed ? 'Место подтверждено' : 'Подтвердить выбор места'}</button>
          </div>
        </div>
      </div>
      {toast}
    </>
  );
}
