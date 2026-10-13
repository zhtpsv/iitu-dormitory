import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideFilters from '../../components/SideFilters.jsx';
import useToast from '../../components/useToast.jsx';

const folders = [
  { name: 'Mail', count: '1253' }, { name: 'In progress', count: '18' }, { name: 'Done', count: '24,532' },
  { name: 'On Hold', count: '14' }, { name: 'Bin', count: '9' },
];
const labels = {
  title: 'LABEL',
  items: [
    { name: 'Medical Forms', color: '#2ed3b7' }, { name: 'Application Forms', color: '#5a9bff' },
    { name: 'Course Registration Forms', color: '#ff8a3d' }, { name: 'Other', color: '#b36bff' },
  ],
};
const initial = [
  { id: 1, title: 'Medical Form 075-U', required: true, types: 'PDF, JPG', file: null },
  { id: 2, title: 'Fluorography Result', required: true, types: 'PDF, JPG', file: null },
  { id: 3, title: 'Police Clearance', required: false, types: 'PDF', file: 'clearance.pdf' },
];

function DocCard({ d, onFile }) {
  const ref = useRef();
  const done = !!d.file;
  return (
    <div className="doc-card" onClick={() => ref.current.click()} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && ref.current.click()}>
      <span className="doc-ico">⇪</span>
      <b>{d.title}</b>
      <small>{d.required ? 'Required' : 'Optional'} • {d.types}</small>
      {done && <small className="fname">{d.file}</small>}
      <span className={`chip ${done ? 'ok' : 'wait'}`}>{done ? 'Uploaded' : 'Pending Upload'}</span>
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg" hidden onClick={(e) => e.stopPropagation()}
        onChange={(e) => e.target.files[0] && onFile(d.id, e.target.files[0].name)} />
    </div>
  );
}

export default function Documents() {
  const nav = useNavigate();
  const [docs, setDocs] = useState(initial);
  const [sent, setSent] = useState(false);
  const [toast, show] = useToast();
  const missing = docs.filter((d) => d.required && !d.file).length;

  const setFile = (id, file) => { setDocs(docs.map((d) => (d.id === id ? { ...d, file } : d))); setSent(false); };
  const submit = () => {
    if (missing) return show(`Upload ${missing} more required document${missing > 1 ? 's' : ''}`);
    setSent(true); show('Documents submitted for verification');
  };

  return (
    <>
      <h1 className="title">Document Verification</h1>
      <div className="split">
        <SideFilters title="MY DOCUMENTS" items={folders} labels={labels} onCreate={() => nav('/student/feedback')} />
        <div className="split-main">
          <p className="hint">Upload required certificates for your dormitory placement.</p>
          <div className="panel doc-grid">
            {docs.map((d) => <DocCard key={d.id} d={d} onFile={setFile} />)}
          </div>
          <div className="right">
            <button className="btn-action" onClick={submit} disabled={sent}>{sent ? 'Submitted' : 'Submit Documents'}</button>
          </div>
        </div>
      </div>
      {toast}
    </>
  );
}
