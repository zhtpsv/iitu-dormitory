import React from 'react';

export default function Placeholder({ title }) {
  return (
    <>
      <h1 className="title">{title}</h1>
      <div className="placeholder">Раздел «{title}» пока пуст.</div>
    </>
  );
}
