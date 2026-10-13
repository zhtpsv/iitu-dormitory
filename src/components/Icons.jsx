import React from 'react';

const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const f = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' };

export const Burger = () => (<svg {...p} width="14" height="14"><path d="M4 8h16M4 16h10" /></svg>);
export const Grid = () => (<svg {...f}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></svg>);
export const Cube = () => (<svg {...f}><path d="M12 2 3 6.5v11L12 22l9-4.5v-11L12 2Zm0 2.2 5.9 2.9L12 10 6.1 7.1 12 4.2ZM5 8.8l6 3v7.4l-6-3V8.8Zm8 10.4v-7.4l6-3v7.4l-6 3Z" /></svg>);
export const Heart = ({ filled }) => (<svg {...p} width="15" height="15" fill={filled ? 'currentColor' : 'none'}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z" /></svg>);
export const HeartFill = () => (<svg {...f}><path d="M12 21s-8-5.6-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.4 12 21 12 21Z" /></svg>);
export const Chat = () => (<svg {...f}><path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.5 3.4 6L5 21l4-2c1 .3 2 .4 3 .4 5.5 0 10-3.6 10-8.4S17.500 3 12 3Zm-4 9.200a1.200 1.200 0 1 1 0-2.400 1.200 1.200 0 0 1 0 2.400Zm4 0a1.200 1.200 0 1 1 0-2.400 1.200 1.200 0 0 1 0 2.400Zm4 0a1.200 1.200 0 1 1 0-2.400 1.200 1.200 0 0 1 0 2.400Z" /></svg>);
export const Layers = () => (<svg {...f}><path d="m12 2 10 5-10 5L2 7l10-5Zm-8.600 9.300L12 15.600l8.600-4.300L22 12l-10 5-10-5 1.400-.7Zm0 4L12 19.600l8.600-4.300L22 16l-10 5-10-5 1.400-.7Z" /></svg>);
export const Users = () => (<svg {...f}><circle cx="9" cy="8" r="3.500" /><path d="M2 20c0-3.300 3-5.500 7-5.500s7 2.200 7 5.500H2Z" /><circle cx="17" cy="9" r="2.600" /><path d="M17 14c3 0 5.500 1.700 5.500 4.500H18c0-1.800-.5-3.300-1-4.500Z" /></svg>);
export const User = () => (<svg {...f}><circle cx="12" cy="7.500" r="4" /><path d="M4 21c0-4.200 3.600-7 8-7s8 2.800 8 7H4Z" /></svg>);
export const Gear = () => (<svg {...f}><path d="M19.400 13a7.500 7.500 0 0 0 0-2l2.100-1.600a.5.5 0 0 0 .1-.6l-2-3.500a.5.5 0 0 0-.6-.2l-2.500 1a7.300 7.300 0 0 0-1.700-1l-.4-2.600a.5.500 0 0 0-.5-.4h-4a.5.5 0 0 0-.5.4l-.4 2.600a7.300 7.300 0 0 0-1.700 1l-2.500-1a.5.5 0 0 0-.6.2l-2 3.500a.5.5 0 0 0 .1.6L4.600 11a7.500 7.500 0 0 0 0 2l-2.100 1.600a.5.5 0 0 0-.1.6l2 3.500c.1.200.4.300.6.200l2.500-1c.5.400 1.100.7 1.700 1l.4 2.600c0 .2.300.4.500.4h4c.3 0 .5-.2.5-.4l.4-2.600c.6-.3 1.200-.6 1.700-1l2.500 1c.2.100.5 0 .6-.2l2-3.500a.5.5 0 0 0-.1-.6L19.400 13ZM12 15.500a3.500 3.500 0 1 1 0-7 3.500 3.500 0 0 1 0 7Z" /></svg>);
export const Power = () => (<svg {...p} width="22" height="22"><path d="M12 3v8" /><path d="M6.300 6.300a8 8 0 1 0 11.400 0" /></svg>);
export const Search = () => (<svg {...p} width="14" height="14"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.500-3.500" /></svg>);
export const Bell = () => (<svg {...f} width="22" height="22"><path d="M12 22a2.500 2.500 0 0 0 2.400-1.800H9.600A2.500 2.500 0 0 0 12 22Zm7-6.500V11c0-3.100-1.700-5.700-4.600-6.400V4a2.400 2.400 0 0 0-4.800 0v.6C6.700 5.300 5 7.900 5 11v4.500l-2 2v1h18v-1l-2-2Z" /></svg>);
export const Chevron = ({ dir = 'down', size = 12 }) => (<svg {...p} width={size} height={size} style={{ transform: dir === 'left' ? 'rotate(90deg)' : dir === 'right' ? 'rotate(-90deg)' : 'none' }}><path d="m6 9 6 6 6-6" /></svg>);
export const Eye = ({ off }) => (<svg {...p} width="16" height="16"><path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{off && <path d="M3 3l18 18" />}</svg>);
export const Camera = () => (<svg {...f} width="22" height="22"><path d="M9 3 7.200 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.200L15 3H9Zm3 5a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9Zm0 2a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5Z" /></svg>);
export const StudentsIcon = () => (<svg {...f} width="22" height="22"><circle cx="9" cy="8" r="3.300" /><path d="M2.500 19.500c0-3.200 2.800-5 6.500-5s6.500 1.800 6.500 5h-13Z" /><circle cx="17" cy="9" r="2.500" /><path d="M16.500 14c3 0 5 1.500 5 4h-4c0-1.500-.4-2.800-1-4Z" /></svg>);
export const TrendIcon = () => (<svg {...p} width="22" height="22"><path d="M3 3v18h18" /><path d="m7 15 4-5 3 3 5-6" /></svg>);
export const ClockIcon = () => (<svg {...p} width="22" height="22"><path d="M3 12a9 9 0 1 0 3-6.700L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" /></svg>);
export const Doc = () => (<svg {...f}><path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.500V9h5.500L13 3.500ZM8 13h8v1.800H8V13Zm0 3.500h8v1.800H8v-1.800Z" /></svg>);
export const Bed = () => (<svg {...f}><path d="M2 5h2v8h18v6h-2v-2H4v2H2V5Z" /><rect x="6" y="7" width="5" height="4" rx="1.500" /><path d="M13 8h5a4 4 0 0 1 4 4v1H13V8Z" /></svg>);
