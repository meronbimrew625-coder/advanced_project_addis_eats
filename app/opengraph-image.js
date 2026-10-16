import { ImageResponse } from 'next/og';
export const alt = 'Addis Eats — Ethiopian food';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#173d32', color: '#fff8e9' }}><div style={{ fontSize: 34, color: '#e7b65c' }}>ADDIS EATS</div><div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>Good food brings us together.</div><div style={{ fontSize: 30, marginTop: 24 }}>Ethiopian favorites, made with care.</div></div>, size); }
