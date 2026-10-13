import React, { useState } from 'react';

export default function useToast() {
  const [msg, setMsg] = useState('');
  const show = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2200); };
  return [msg ? <div className="toast">{msg}</div> : null, show];
}
