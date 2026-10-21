# ObscurVPN

Open-source starter project for a privacy-focused VPN service. **This repository is not a complete, production-ready VPN by itself.** It provides a dark web dashboard and a small API for status/configuration, plus Docker Compose scaffolding for a real WireGuard server.

## Important reality check
A VPN requires a tunnel endpoint on a server and a client that configures the device's network interface. A website that says “Connected” is not a VPN. This project intentionally does not fake a tunnel or claim to encrypt your device traffic. The dashboard labels connection state as a demo until you configure a real WireGuard server/client.

## Stack
- Frontend: React + Vite
- API: Node.js + Express
- VPN protocol: WireGuard (recommended; audited open-source implementation)
- Server deployment scaffold: Docker Compose + `linuxserver/wireguard`

## Run the dashboard locally
Requirements: Node.js 20+.

```bash
npm install
npm run dev
```
Open the Vite URL shown in the terminal. The frontend calls `/api/status`; Vite proxies that request to the API.

Run API separately:
```bash
npm run api
```

## Start the WireGuard server
1. Use a Linux VPS you own/administer with a public IPv4 address, UDP port 51820 available, and provider permission to run a VPN.
2. Install Docker and Docker Compose on that server.
3. Copy `.env.example` to `.env` and set `SERVERURL` to your server's public IP/domain, `SERVERPORT=51820`, and `PEERS=1`.
4. Review `docker-compose.yml`, then run `docker compose up -d`.
5. Inspect server logs and follow the WireGuard image documentation to retrieve the generated peer config/QR code.
6. Import the peer configuration into the official WireGuard app for your device.
7. Configure your server firewall/security group to allow UDP 51820. Do not expose the API/dashboard publicly without authentication and TLS.

The Compose file is a deployment template, not a one-click production service. Provider/network/firewall settings vary. Never commit `.env` or peer private keys.

## Production checklist
- Use a maintained OS and Docker image; pin image versions/digests for production.
- Add authentication, rate limiting, TLS/reverse proxy, monitoring, backups, abuse handling and a privacy policy.
- Do not claim “no logs” unless you have designed, tested and audited logging behavior.
- Audit dependencies and follow applicable laws/provider terms.
- Have an experienced network administrator review the setup before offering a public VPN service.

## License
MIT for the original project files. Third-party components retain their own licenses.
