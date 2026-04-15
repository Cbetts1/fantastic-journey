const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

// GET all vmachines
router.get('/', (req, res) => {
  res.json(store.vmachines);
});

// GET single vmachine
router.get('/:id', (req, res) => {
  const item = store.vmachines.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VMachine not found' });
  res.json(item);
});

// POST create vmachine
router.post('/', (req, res) => {
  const { name, os, vcpus, memoryGB, storageGB } = req.body;
  if (!name || !os) return res.status(400).json({ error: 'name and os are required' });
  const vm = { id: uuidv4(), name, os, status: 'stopped', vcpus: vcpus || 1, memoryGB: memoryGB || 2, storageGB: storageGB || 40 };
  store.vmachines.push(vm);
  res.status(201).json(vm);
});

// PATCH toggle status
router.patch('/:id/toggle', (req, res) => {
  const item = store.vmachines.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VMachine not found' });
  item.status = item.status === 'running' ? 'stopped' : 'running';
  res.json(item);
});

// DELETE vmachine
router.delete('/:id', (req, res) => {
  const idx = store.vmachines.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'VMachine not found' });
  store.vmachines.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
