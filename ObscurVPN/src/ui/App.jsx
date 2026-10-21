import React, { useEffect, useState } from 'react';

const Icon = ({name}) => {
  const paths = {
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></>,
    lock: <><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></>,
    zap: <path d="m13 2-3 8h7l-6 12 2-9H6l7-11Z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

export default function App() {
  const [status, setStatus] = useState('checking');
  const [apiMessage, setApiMessage] = useState('Checking API…');
  const [tab, setTab] = useState('Overview');
  useEffect(() => {
    fetch('/api/status').then(r => r.json()).then(data => {
      setStatus(data.api === 'online' ? 'online' : 'offline');
      setApiMessage(data.message);
    }).catch(() => { setStatus('offline'); setApiMessage('API unavailable. Start the API server and refresh.'); });
  }, []);
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" aria-label="ObscurVPN home"><span className="brand-mark"><Icon name="shield"/></span><span>Obscur<span className="muted-brand">VPN</span></span></a>
      <div className="side-label">WORKSPACE</div>
      {['Overview','Servers','Settings'].map((item,i)=><button key={item} className={'nav-item '+(tab===item?'active':'')} onClick={()=>setTab(item)}><span className="nav-icon">{i===0?'◫':i===1?<Icon name="globe"/>:<Icon name="settings"/>}</span>{item}</button>)}
      <div className="sidebar-bottom"><div className="secure-icon"><Icon name="lock"/></div><strong>Privacy by design</strong><p>Your traffic is not routed by this dashboard. Connect with the WireGuard client after configuring your own server.</p><span className="tiny-status"><i/> API {status}</span></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb">ObscurVPN <span>/</span> {tab}</div><div className="profile"><span className="status-dot"></span> Local dashboard <span className="avatar">O</span></div></header>
      <section className="welcome"><div><div className="eyebrow">YOUR PRIVACY. YOUR CONTROL.</div><h1>Stay private.<br/><em>Stay in control.</em></h1><p className="lede">A clean control panel for your private network. Bring your own WireGuard server; keep your keys under your control.</p></div><div className="hero-art"><div className="orbit orbit-a"></div><div className="orbit orbit-b"></div><div className="hero-shield"><Icon name="shield"/></div><span className="orbit-caption">PRIVATE BY DESIGN</span></div></section>
      {tab==='Overview' ? <>
        <div className="section-heading"><div><h2>Connection overview</h2><p>Dashboard status is separate from VPN tunnel status.</p></div><span className="pill"><i/> {status==='online'?'API ONLINE':status.toUpperCase()}</span></div>
        <div className="grid">
          <article className="card connection-card"><div className="card-head"><span>VPN TUNNEL</span><span className="outline-icon"><Icon name="shield"/></span></div><div className="connection-state"><div className="power-ring"><Icon name="lock"/></div><h3>Not connected</h3><p>A real tunnel has not been configured.</p></div><div className="notice"><span>!</span><div><strong>Setup required</strong><p>Deploy WireGuard on a server, then import its peer configuration into the official WireGuard app.</p></div></div><a className="button primary" href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">Get WireGuard <span>↗</span></a></article>
          <article className="card server-card"><div className="card-head"><span>SERVER LOCATION</span><span className="outline-icon"><Icon name="globe"/></span></div><div className="server-placeholder"><div className="globe-large"><Icon name="globe"/></div><span className="server-tag">YOUR SERVER</span><h3>Bring your own</h3><p>Choose a VPS region you trust and administer the endpoint yourself.</p></div><div className="detail-row"><span>Protocol</span><strong>WireGuard</strong></div><div className="detail-row"><span>Endpoint</span><strong>Not configured</strong></div></article>
          <article className="card mini-card"><span className="outline-icon"><Icon name="zap"/></span><div><h3>Lean by design</h3><p>Modern WireGuard tunnel technology, when configured in the native client.</p></div></article>
          <article className="card mini-card"><span className="outline-icon"><Icon name="lock"/></span><div><h3>Your keys, your control</h3><p>Never upload or commit private keys. Store peer configs securely.</p></div></article>
        </div>
        <section className="bottom-grid"><article className="card steps-card"><div className="card-head"><span>GET STARTED</span><span className="subtle">3 STEPS</span></div><div className="step"><b>01</b><div><strong>Deploy a server</strong><p>Follow the repository README to deploy WireGuard on a Linux VPS.</p></div><span>↗</span></div><div className="step"><b>02</b><div><strong>Generate a peer profile</strong><p>Create a client profile on your server. Keep its private key secret.</p></div><span>↗</span></div><div className="step"><b>03</b><div><strong>Connect with WireGuard</strong><p>Import the profile in the official client for your operating system.</p></div><span>↗</span></div></article><article className="card status-card"><div className="card-head"><span>SERVICE STATUS</span><span className="status-dot"></span></div><div className="service-line"><span>Dashboard API</span><strong className={status==='online'?'good':'bad'}>{status}</strong></div><div className="service-line"><span>VPN tunnel</span><strong className="bad">not configured</strong></div><div className="service-line"><span>Traffic encryption</span><strong>WireGuard client</strong></div><p className="footnote">{apiMessage}</p></article></section>
      </> : <section className="card other-tab"><div className="outline-icon"><Icon name={tab==='Servers'?'globe':'settings'}/></div><h2>{tab==='Servers'?'Your server setup':'Dashboard settings'}</h2><p>{tab==='Servers'?'No server is configured in this dashboard. Deploy the WireGuard template and add the peer to the official WireGuard client.':'This starter dashboard stores no account data or VPN keys. Production deployments need authentication, TLS, monitoring and a reviewed privacy policy.'}</p><a className="button primary" href="https://www.wireguard.com/" target="_blank" rel="noreferrer">WireGuard documentation ↗</a></section>}
      <footer><span>◈ OBSCURVPN</span><span>Open-source starter · WireGuard compatible</span><span>Privacy starts with honest defaults.</span></footer>
    </main>
  </div>;
}
