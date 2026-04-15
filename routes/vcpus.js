const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

// GET all vcpus
router.get('/', (req, res) => {
  res.json(store.vcpus);
});

// GET single vcpu
router.get('/:id', (req, res) => {
  const item = store.vcpus.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VCPU not found' });
  res.json(item);
});

// POST create vcpu
router.post('/', (req, res) => {
  const { name, cores, threads, clockGHz, architecture } = req.body;
  if (!name || !cores) return res.status(400).json({ error: 'name and cores are required' });
  const vcpu = { id: uuidv4(), name, cores, threads: threads || cores * 2, clockGHz: clockGHz || 2.4, architecture: architecture || 'x86_64', status: 'inactive' };
  store.vcpus.push(vcpu);
  res.status(201).json(vcpu);
});

// PATCH toggle status
router.patch('/:id/toggle', (req, res) => {
  const item = store.vcpus.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VCPU not found' });
  item.status = item.status === 'active' ? 'inactive' : 'active';
  res.json(item);
});

// DELETE vcpu
router.delete('/:id', (req, res) => {
  const idx = store.vcpus.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'VCPU not found' });
  store.vcpus.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
