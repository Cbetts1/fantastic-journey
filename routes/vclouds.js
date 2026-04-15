const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

// GET all vclouds
router.get('/', (req, res) => {
  res.json(store.vclouds);
});

// GET single vcloud
router.get('/:id', (req, res) => {
  const item = store.vclouds.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VCloud not found' });
  res.json(item);
});

// POST create vcloud
router.post('/', (req, res) => {
  const { name, region, cpu, memoryGB, storageGB } = req.body;
  if (!name || !region) return res.status(400).json({ error: 'name and region are required' });
  const vcloud = { id: uuidv4(), name, region, status: 'stopped', cpu: cpu || 2, memoryGB: memoryGB || 8, storageGB: storageGB || 100 };
  store.vclouds.push(vcloud);
  res.status(201).json(vcloud);
});

// PATCH toggle status
router.patch('/:id/toggle', (req, res) => {
  const item = store.vclouds.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'VCloud not found' });
  item.status = item.status === 'running' ? 'stopped' : 'running';
  res.json(item);
});

// DELETE vcloud
router.delete('/:id', (req, res) => {
  const idx = store.vclouds.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'VCloud not found' });
  store.vclouds.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
