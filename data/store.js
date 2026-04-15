const { v4: uuidv4 } = require('uuid');

// In-memory data store (replace with a database for production)
const store = {
  vclouds: [
    { id: uuidv4(), name: 'VCloud-Alpha', region: 'us-east-1', status: 'running', cpu: 8, memoryGB: 32, storageGB: 500 },
    { id: uuidv4(), name: 'VCloud-Beta',  region: 'eu-west-1',  status: 'stopped', cpu: 4, memoryGB: 16, storageGB: 250 },
  ],
  vmachines: [
    { id: uuidv4(), name: 'VM-Web-01',  os: 'Ubuntu 22.04', status: 'running', vcpus: 2, memoryGB: 4,  storageGB: 80  },
    { id: uuidv4(), name: 'VM-DB-01',   os: 'Debian 12',    status: 'running', vcpus: 4, memoryGB: 8,  storageGB: 200 },
    { id: uuidv4(), name: 'VM-Dev-01',  os: 'Fedora 39',    status: 'stopped', vcpus: 2, memoryGB: 4,  storageGB: 60  },
  ],
  vcpus: [
    { id: uuidv4(), name: 'VCPU-01', cores: 4,  threads: 8,  clockGHz: 3.2, architecture: 'x86_64', status: 'active'   },
    { id: uuidv4(), name: 'VCPU-02', cores: 8,  threads: 16, clockGHz: 3.8, architecture: 'x86_64', status: 'active'   },
    { id: uuidv4(), name: 'VCPU-03', cores: 2,  threads: 4,  clockGHz: 2.9, architecture: 'arm64',  status: 'inactive' },
  ],
};

module.exports = store;
