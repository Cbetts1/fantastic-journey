const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/vclouds',   require('./routes/vclouds'));
app.use('/api/vmachines', require('./routes/vmachines'));
app.use('/api/vcpus',     require('./routes/vcpus'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the SPA for all other routes
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fantastic Journey running on http://0.0.0.0:${PORT}`);
  console.log(`Access remotely at http://<your-ip>:${PORT}`);
});

module.exports = app;
