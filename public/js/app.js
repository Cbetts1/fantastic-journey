const API = '/api';

// ── Utilities ──────────────────────────────────────────────────
async function fetchJSON(url, opts = {}) {
  const r = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (r.status === 204) return null;
  return r.json();
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function statusBadge(status) {
  return `<span class="status-badge status-${status}">${status}</span>`;
}

// ── Summary counts ─────────────────────────────────────────────
async function updateSummary() {
  const [clouds, vms, cpus] = await Promise.all([
    fetchJSON(`${API}/vclouds`),
    fetchJSON(`${API}/vmachines`),
    fetchJSON(`${API}/vcpus`),
  ]);
  document.getElementById('count-clouds').textContent = clouds.length;
  document.getElementById('count-vms').textContent = vms.length;
  document.getElementById('count-cpus').textContent = cpus.length;
}

// ── VClouds ────────────────────────────────────────────────────
async function loadVClouds() {
  const list = await fetchJSON(`${API}/vclouds`);
  const el = document.getElementById('vcloud-list');
  if (!list.length) { el.innerHTML = '<div class="empty-state">No VClouds. Add one above.</div>'; return; }
  el.innerHTML = list.map(v => `
    <div class="resource-card" data-id="${v.id}">
      <div class="resource-icon icon-cloud">☁️</div>
      <div class="resource-info">
        <div class="resource-name">${v.name}</div>
        <div class="resource-meta">${v.region} · ${v.cpu} CPU · ${v.memoryGB} GB RAM · ${v.storageGB} GB Storage</div>
      </div>
      ${statusBadge(v.status)}
      <div class="card-actions">
        <button class="btn-toggle" onclick="toggleVCloud('${v.id}')">${v.status === 'running' ? 'Stop' : 'Start'}</button>
        <button class="btn-delete" onclick="deleteVCloud('${v.id}')">✕</button>
      </div>
    </div>`).join('');
}

async function toggleVCloud(id) {
  await fetchJSON(`${API}/vclouds/${id}/toggle`, { method: 'PATCH' });
  toast('VCloud status updated');
  loadVClouds(); updateSummary();
}

async function deleteVCloud(id) {
  await fetchJSON(`${API}/vclouds/${id}`, { method: 'DELETE' });
  toast('VCloud deleted');
  loadVClouds(); updateSummary();
}

document.getElementById('form-vcloud').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  await fetchJSON(`${API}/vclouds`, { method: 'POST', body: JSON.stringify(data) });
  toast('VCloud created');
  closeModal('modal-vcloud');
  e.target.reset();
  loadVClouds(); updateSummary();
});

// ── VMachines ──────────────────────────────────────────────────
async function loadVMachines() {
  const list = await fetchJSON(`${API}/vmachines`);
  const el = document.getElementById('vm-list');
  if (!list.length) { el.innerHTML = '<div class="empty-state">No VMachines. Add one above.</div>'; return; }
  el.innerHTML = list.map(v => `
    <div class="resource-card" data-id="${v.id}">
      <div class="resource-icon icon-vm">🖥️</div>
      <div class="resource-info">
        <div class="resource-name">${v.name}</div>
        <div class="resource-meta">${v.os} · ${v.vcpus} vCPU · ${v.memoryGB} GB RAM · ${v.storageGB} GB</div>
      </div>
      ${statusBadge(v.status)}
      <div class="card-actions">
        <button class="btn-toggle" onclick="toggleVM('${v.id}')">${v.status === 'running' ? 'Stop' : 'Start'}</button>
        <button class="btn-delete" onclick="deleteVM('${v.id}')">✕</button>
      </div>
    </div>`).join('');
}

async function toggleVM(id) {
  await fetchJSON(`${API}/vmachines/${id}/toggle`, { method: 'PATCH' });
  toast('VMachine status updated');
  loadVMachines(); updateSummary();
}

async function deleteVM(id) {
  await fetchJSON(`${API}/vmachines/${id}`, { method: 'DELETE' });
  toast('VMachine deleted');
  loadVMachines(); updateSummary();
}

document.getElementById('form-vm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  await fetchJSON(`${API}/vmachines`, { method: 'POST', body: JSON.stringify(data) });
  toast('VMachine created');
  closeModal('modal-vm');
  e.target.reset();
  loadVMachines(); updateSummary();
});

// ── VCPUs ──────────────────────────────────────────────────────
async function loadVCPUs() {
  const list = await fetchJSON(`${API}/vcpus`);
  const el = document.getElementById('vcpu-list');
  if (!list.length) { el.innerHTML = '<div class="empty-state">No VCPUs. Add one above.</div>'; return; }
  el.innerHTML = list.map(v => `
    <div class="resource-card" data-id="${v.id}">
      <div class="resource-icon icon-cpu">⚙️</div>
      <div class="resource-info">
        <div class="resource-name">${v.name}</div>
        <div class="resource-meta">${v.cores} cores / ${v.threads} threads · ${v.clockGHz} GHz · ${v.architecture}</div>
      </div>
      ${statusBadge(v.status)}
      <div class="card-actions">
        <button class="btn-toggle" onclick="toggleVCPU('${v.id}')">${v.status === 'active' ? 'Deactivate' : 'Activate'}</button>
        <button class="btn-delete" onclick="deleteVCPU('${v.id}')">✕</button>
      </div>
    </div>`).join('');
}

async function toggleVCPU(id) {
  await fetchJSON(`${API}/vcpus/${id}/toggle`, { method: 'PATCH' });
  toast('VCPU status updated');
  loadVCPUs(); updateSummary();
}

async function deleteVCPU(id) {
  await fetchJSON(`${API}/vcpus/${id}`, { method: 'DELETE' });
  toast('VCPU deleted');
  loadVCPUs(); updateSummary();
}

document.getElementById('form-vcpu').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  await fetchJSON(`${API}/vcpus`, { method: 'POST', body: JSON.stringify(data) });
  toast('VCPU created');
  closeModal('modal-vcpu');
  e.target.reset();
  loadVCPUs(); updateSummary();
});

// ── Tabs ───────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ── Modals ─────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ── Health check ───────────────────────────────────────────────
async function checkHealth() {
  try {
    const data = await fetchJSON(`${API}/health`);
    if (data.status === 'ok') {
      document.querySelector('.health-dot').classList.add('ok');
    }
  } catch (_) { /* offline */ }
}

// ── Init ───────────────────────────────────────────────────────
checkHealth();
updateSummary();
loadVClouds();
loadVMachines();
loadVCPUs();
