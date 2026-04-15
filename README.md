# fantastic-journey

**VCloud · VMachine · VCPU — Remote Management Dashboard**

A mobile-responsive web dashboard + REST API for managing Virtual Clouds, Virtual Machines, and Virtual CPUs. Access it from any browser — phone, tablet, or desktop.

---

## 🚀 Quick Start

### Requirements
- [Node.js](https://nodejs.org/) 18+

### Install & Run

```bash
npm install
npm start
```

The server starts on **http://0.0.0.0:3000** — open it in any browser on your local network.

### Remote Access (Phone / Other Devices)

1. Find your machine's local IP address:
   - **Mac/Linux:** `ip addr` or `ifconfig`
   - **Windows:** `ipconfig`
2. Open **`http://<your-ip>:3000`** in your phone's browser.

For access over the internet, expose the port using one of these options:
- **[ngrok](https://ngrok.com/):** `ngrok http 3000` → gives you a public URL instantly
- **[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/):** Free, stable tunnel
- Deploy to a VPS/cloud (Render, Railway, Fly.io, DigitalOcean, etc.)

---

## 📦 Project Structure

```
fantastic-journey/
├── index.js              # Express app entry point
├── data/
│   └── store.js          # In-memory data store
├── routes/
│   ├── vclouds.js        # /api/vclouds routes
│   ├── vmachines.js      # /api/vmachines routes
│   └── vcpus.js          # /api/vcpus routes
└── public/
    ├── index.html        # Mobile-responsive SPA
    ├── css/style.css
    └── js/app.js
```

---

## 📡 REST API

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vclouds` | List all VClouds |
| GET | `/vclouds/:id` | Get a VCloud |
| POST | `/vclouds` | Create a VCloud |
| PATCH | `/vclouds/:id/toggle` | Start/stop a VCloud |
| DELETE | `/vclouds/:id` | Delete a VCloud |
| GET | `/vmachines` | List all VMachines |
| GET | `/vmachines/:id` | Get a VMachine |
| POST | `/vmachines` | Create a VMachine |
| PATCH | `/vmachines/:id/toggle` | Start/stop a VMachine |
| DELETE | `/vmachines/:id` | Delete a VMachine |
| GET | `/vcpus` | List all VCPUs |
| GET | `/vcpus/:id` | Get a VCPU |
| POST | `/vcpus` | Create a VCPU |
| PATCH | `/vcpus/:id/toggle` | Activate/deactivate a VCPU |
| DELETE | `/vcpus/:id` | Delete a VCPU |
| GET | `/health` | API health check |

### Example: Create a VMachine

```bash
curl -X POST http://localhost:3000/api/vmachines \
  -H "Content-Type: application/json" \
  -d '{"name":"VM-Prod-01","os":"Ubuntu 22.04","vcpus":4,"memoryGB":8,"storageGB":100}'
```

---

## 🌐 Deploying for Permanent Remote Access

### Render (free tier)
1. Push this repo to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Start Command:** `npm start`
4. Your app gets a public `https://` URL

### Railway / Fly.io / Heroku
Standard Node.js deploy — set `PORT` env var if needed (app reads `process.env.PORT`).

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the server listens on |

---

## 📝 Notes

- Data is currently stored **in-memory** and resets on restart. To persist data, swap `data/store.js` for a database (SQLite, MongoDB, PostgreSQL, etc.).
