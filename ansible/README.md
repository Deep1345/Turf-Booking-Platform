# Ansible Deployment — Turf Booking Platform

Automates provisioning and deployment of the Turf Booking Platform on a remote Ubuntu server.

## Directory Structure

```
ansible/
├── ansible.cfg                  # Ansible configuration
├── inventory/
│   └── hosts.ini                # Target server inventory
├── playbooks/
│   ├── setup-server.yml         # One-time server provisioning
│   └── deploy.yml               # Application deployment
└── README.md
```

## Prerequisites

1. **Ansible installed** on your local machine:
   ```bash
   sudo apt update && sudo apt install ansible -y
   ```
2. **SSH access** to the target server (key-based authentication)
3. **Docker images pushed** to Docker Hub:
   - `deep20180/turf-backend:latest`
   - `deep20180/turf-frontend:latest`

## Setup

1. Edit `inventory/hosts.ini` and replace `your_server_ip` with your actual server IP:
   ```ini
   [webservers]
   192.168.1.100 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa
   ```

2. Update `ansible.cfg` if your SSH user or key path differs.

## Usage

### First-Time Server Setup
Installs Docker, Docker Compose, and all dependencies:

```bash
cd ansible
ansible-playbook playbooks/setup-server.yml
```

### Deploy / Update the Application
Pulls latest images and starts the stack:

```bash
cd ansible
ansible-playbook playbooks/deploy.yml
```

### Verify Syntax (without running)
```bash
cd ansible
ansible-playbook playbooks/setup-server.yml --syntax-check
ansible-playbook playbooks/deploy.yml --syntax-check
```

### Dry Run
```bash
cd ansible
ansible-playbook playbooks/deploy.yml --check
```

## What the Playbooks Do

| Playbook | Purpose |
|---|---|
| `setup-server.yml` | Updates system packages, installs Docker Engine & Compose plugin, adds user to docker group |
| `deploy.yml` | Creates `/opt/turf-booking` on the server, copies `docker-compose.prod.yml` & `.env`, pulls images, starts stack, runs health checks |
