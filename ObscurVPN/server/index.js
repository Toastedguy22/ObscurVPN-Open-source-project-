import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 8787);
const here = path.dirname(fileURLToPath(import.meta.url));
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

app.get('/api/status', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({
    product: 'ObscurVPN',
    api: 'online',
    tunnelConfigured: false,
    connection: 'not-configured',
    message: 'Dashboard/API is online. No device VPN tunnel is active from this web app.'
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Serve production frontend build if present.
app.use(express.static(path.resolve(here, '../dist')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.resolve(here, '../dist/index.html'), err => { if (err) next(); });
});

app.listen(port, '0.0.0.0', () => console.log(`ObscurVPN API listening on ${port}`));
