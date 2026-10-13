import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Rooms from './pages/Rooms.jsx';
import Team from './pages/Team.jsx';
import AddMember from './pages/AddMember.jsx';
import Placeholder from './pages/Placeholder.jsx';
import RoleSelect from './pages/RoleSelect.jsx';
import Documents from './pages/student/Documents.jsx';
import Feedback from './pages/student/Feedback.jsx';
import RoomSelect from './pages/student/RoomSelect.jsx';
import Roommates from './pages/student/Roommates.jsx';

export const INITIAL_TEAM = [
  { id: 1, name: 'Adil', role: 'Admin', email: 'adil@gmail.com', color: '#2f7d4f' },
  { id: 2, name: 'Nurbek', role: 'Admin', email: 'nurbek@gmail.com', color: '#3b6ea5' },
  { id: 3, name: 'Nika', role: 'Admin', email: 'nail@gmail.com', color: '#c0577a' },
  { id: 4, name: 'Igor', role: 'Admin', email: 'igor@gmail.com', color: '#7a6a58' },
  { id: 5, name: 'Anel', role: 'Admin', email: 'anny@gmail.com', color: '#8a7f9c' },
  { id: 6, name: 'Aneltwo', role: 'Admin', email: 'anel@gmail.com', color: '#a0643c' },
  { id: 7, name: 'Zhansaya', role: 'Admin', email: 'who@gmail.com', color: '#2c5b6e' },
  { id: 8, name: 'Damirlan', role: 'Admin', email: 'what@gmail.com', color: '#b4566d' },
];

const homeOf = (role) => (role === 'admin' ? '/' : role === 'student' ? '/student' : '/role');

// Доступ только для нужной роли; остальных отправляем на их главную или на выбор роли
function Protected({ session, role, children }) {
  const loc = useLocation();
  if (!session) return <Navigate to="/role" state={{ from: loc }} replace />;
  if (session !== role) return <Navigate to={homeOf(session)} replace />;
  return children;
}

// Страницы входа доступны только после выбора роли
function NeedRole({ pending, session, children }) {
  if (session) return <Navigate to={homeOf(session)} replace />;
  if (!pending) return <Navigate to="/role" replace />;
  return children;
}

export default function App() {
  const [session, setSession] = useState(() => localStorage.getItem('iitu_role'));
  const [pending, setPending] = useState(() => localStorage.getItem('iitu_role_choice'));
  const [team, setTeam] = useState(INITIAL_TEAM);

  const choose = (role) => { localStorage.setItem('iitu_role_choice', role); setPending(role); };
  const login = (role) => { localStorage.setItem('iitu_role', role); setSession(role); };
  const logout = () => {
    ['iitu_role', 'iitu_role_choice'].forEach((k) => localStorage.removeItem(k));
    setSession(null); setPending(null);
  };

  return (
    <Routes>
      <Route path="/role" element={session ? <Navigate to={homeOf(session)} replace /> : <RoleSelect onPick={choose} />} />
      <Route path="/register" element={<NeedRole pending={pending} session={session}><Register role={pending} onDone={login} /></NeedRole>} />
      <Route path="/login" element={<NeedRole pending={pending} session={session}><Login role={pending} onDone={login} /></NeedRole>} />

      <Route element={<Protected session={session} role="admin"><Layout role="admin" onLogout={logout} /></Protected>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/messages" element={<Placeholder title="Messages" />} />
        <Route path="/complaints" element={<Placeholder title="Complaints" />} />
        <Route path="/students" element={<Placeholder title="Students" />} />
        <Route path="/team" element={<Team team={team} />} />
        <Route path="/team/new" element={<AddMember onAdd={(m) => setTeam((t) => [...t, m])} />} />
        <Route path="/settings" element={<Placeholder title="Settings" />} />
      </Route>

      <Route path="/student" element={<Protected session={session} role="student"><Layout role="student" onLogout={logout} /></Protected>}>
        <Route index element={<Navigate to="documents" replace />} />
        <Route path="documents" element={<Documents />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="room" element={<RoomSelect />} />
        <Route path="roommates" element={<Roommates />} />
      </Route>

      <Route path="*" element={<Navigate to={homeOf(session)} replace />} />
    </Routes>
  );
}
