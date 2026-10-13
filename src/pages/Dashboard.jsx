import React, { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceDot } from 'recharts';
import { ClockIcon, StudentsIcon, TrendIcon } from '../components/Icons.jsx';


function seeded(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
}

function useSalesData() {
  return useMemo(() => {
    const r = seeded(42);
    const out = [];
    let v = 20;
    for (let i = 0; i <= 60; i++) {
      v = Math.max(20, Math.min(70, v + (r() - 0.48) * 9));
      out.push({ x: 5 + i, k: `${5 + i}k`, v: Math.round(v * 10) / 10 });
    }
    out[16].v = 86; // peak ~21k
    out[30].v = 62;
    out[35].v = 24;
    out[37].v = 27;
    out[36].v = 31;
    out[42].v = 43;
    out[41].v = 72;
    return out;
  }, []);
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthSelect = () => (
  <select className="select" defaultValue="October">
    {months.map((m) => <option key={m}>{m}</option>)}
  </select>
);

const revenue = [
  [5, 20, 20], [8, 55, 28], [10, 70, 33], [12, 50, 32], [15, 33, 28], [18, 30, 30], [20, 33, 32], [23, 47, 48],
  [25, 52, 55], [27, 50, 33], [29, 47, 34], [31, 30, 55], [33, 25, 80], [35, 30, 90], [37, 45, 65], [40, 58, 40],
  [42, 42, 52], [45, 30, 66], [47, 28, 40], [50, 36, 36], [52, 55, 50], [55, 90, 58], [57, 80, 55], [60, 20, 20],
].map(([x, s, p]) => ({ x, label: `${x}k`, Sales: s, Profit: p }));

export default function Dashboard() {
  const sales = useSalesData();
  const peak = sales[16];

  return (
    <>
      <h1 className="title">Dashboard</h1>

      <div className="stats">
        <div className="stat"><small>Total Student</small><b>2,100</b>
          <span className="ico" style={{ background: '#e4e3ff', color: '#8280ff' }}><StudentsIcon /></span></div>
        <div className="stat"><small>Total Sales</small><b>$89,000</b>
          <span className="ico" style={{ background: '#d9f7e8', color: '#4ad991' }}><TrendIcon /></span></div>
        <div className="stat"><small>Total Complains</small><b>2040</b>
          <span className="ico" style={{ background: '#ffded1', color: '#ff9066' }}><ClockIcon /></span></div>
      </div>

      <div className="card">
        <div className="card-head"><h2>Sales Details</h2><MonthSelect /></div>
        <div style={{ height: 250 }}>
          <ResponsiveContainer>
            <AreaChart data={sales} margin={{ top: 28, right: 6, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4379ee" stopOpacity={0.25} />
                  <stop offset="1" stopColor="#4379ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eceef3" />
              <XAxis dataKey="x" ticks={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]} tickFormatter={(v) => `${v}k`} tick={{ fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis domain={[20, 100]} ticks={[20, 40, 60, 80, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip formatter={(v) => [`${v}`, 'Sales']} labelFormatter={(l) => `${l}k`} contentStyle={{ fontSize: 11 }} />
              <Area type="linear" dataKey="v" stroke="#4379ee" strokeWidth={1.200} fill="url(#sg)" dot={false} activeDot={{ r: 4 }} />
              <ReferenceDot x={peak.x} y={peak.v} r={3.5} fill="#4379ee" stroke="#4379ee"
                label={({ viewBox }) => (
                  <g>
                    <rect x={viewBox.x - 30} y={viewBox.y - 28} width={60} height={16} rx={3} fill="#4379ee" />
                    <text x={viewBox.x} y={viewBox.y - 17} textAnchor="middle" fill="#fff" fontSize={9} fontWeight={700}>64,3664.77</text>
                  </g>
                )} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h2>Revenue</h2><MonthSelect /></div>
        <div style={{ height: 250 }}>
          <ResponsiveContainer>
            <AreaChart data={revenue} margin={{ top: 10, right: 6, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#eceef3" />
              <XAxis dataKey="x" ticks={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]} tickFormatter={(v) => `${v}k`} tick={{ fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis domain={[20, 100]} ticks={[20, 40, 60, 80, 100]} tick={{ fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="Sales" stroke="none" fill="#d7a8ff" fillOpacity={0.75} />
              <Area type="monotone" dataKey="Profit" stroke="none" fill="#ff9a73" fillOpacity={0.85} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="legend">
          <span><i style={{ background: '#d7a8ff' }} />Sales</span>
          <span><i style={{ background: '#ff9a73' }} />Profit</span>
        </div>
      </div>
    </>
  );
}
