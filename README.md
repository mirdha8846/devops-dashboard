# 🚀 DevOps Dashboard - Production Ready

A comprehensive monitoring dashboard built with **Node.js** and **Prometheus** for real-time application metrics tracking and visualization.

[![Build Status](https://github.com/mirdha8846/devops-dashboard/workflows/Build%20Docker/badge.svg)](https://github.com/mirdha8846/devops-dashboard/actions)
[![Docker Hub](https://img.shields.io/docker/v/pankajmirdha/testing?label=Docker%20Hub)](https://hub.docker.com/r/pankajmirdha/testing)

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Production Deployment](#production-deployment)
- [API Endpoints](#api-endpoints)
- [Monitoring & Metrics](#monitoring--metrics)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CI/CD Pipeline                           │
│  GitHub Actions → Docker Build → Docker Hub → GitOps → K8s     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Production Environment                        │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   Node.js    │←──→│  Prometheus  │←──→│   Grafana    │     │
│  │   Backend    │    │   (Metrics)  │    │ (Dashboards) │     │
│  │  Port: 3002  │    │  Port: 9090  │    │  Port: 3000  │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
│         ↓                    ↓                                  │
│    /metrics              Scraping                               │
│    /data/cpu             Every 15s                              │
│    /data/memory                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **📊 Real-time Metrics Collection**: Track HTTP requests, CPU usage, memory consumption
- **🔍 Prometheus Integration**: Automatic metric scraping and storage
- **📈 Custom Metrics**: HTTP request counter, duration histogram, Node.js process metrics
- **🐳 Docker Ready**: Containerized application with multi-stage builds
- **🔄 GitOps Workflow**: Automated deployment using ArgoCD/FluxCD
- **🚀 CI/CD Pipeline**: Automated builds, tests, and deployments via GitHub Actions
- **🛡️ Production Ready**: Environment-based configuration, error handling, CORS support

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Backend** | Node.js, Express.js |
| **Monitoring** | Prometheus, prom-client |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Orchestration** | Kubernetes (GitOps) |
| **Registry** | Docker Hub |

---

## 📁 Project Structure

```
devops-dashboard/
├── .github/
│   └── workflows/
│       └── prod.yaml              # CI/CD pipeline configuration
├── app/                           # Main application directory
│   ├── controller/
│   │   └── metric.controller.js   # Prometheus query handlers
│   ├── middleware/
│   │   └── prmo-middlware.js      # Metrics tracking middleware
│   ├── routes/
│   │   ├── metric.route.js        # Metrics API routes
│   │   └── fake.routes.js         # Test/demo routes
│   ├── utils/
│   │   ├── prometheusClient.js    # Prometheus client setup
│   │   └── prometheusData.js      # Prometheus query helper
│   ├── DOCKERFILE                 # Docker build configuration
│   ├── package.json               # Dependencies
│   └── index.js                   # Application entry point
├── prometheus.yml                 # Prometheus configuration
├── docker-compose.yml             # Local development setup
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Git**

### Local Development

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mirdha8846/devops-dashboard.git
cd devops-dashboard
```

#### 2️⃣ Install Dependencies

```bash
cd app
npm install
```

#### 3️⃣ Start Prometheus (Docker)

```bash
# Return to project root
cd ..

# Start Prometheus container
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v ${PWD}/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest \
  --config.file=/etc/prometheus/prometheus.yml
```

**Verify Prometheus**: Open http://localhost:9090

#### 4️⃣ Start the Application

```bash
cd app
npm run dev
```

**Application running on**: http://localhost:3002

#### 5️⃣ Verify Setup

- **Metrics Endpoint**: http://localhost:3002/metrics
- **Prometheus Targets**: http://localhost:9090/targets
- **Sample Query**: http://localhost:3002/data/all-metrics

---

### Production Deployment

#### Using Docker

```bash
# Build the image
docker build -t devops-dashboard:latest ./app

# Run the container
docker run -d \
  --name devops-app \
  -p 3002:3002 \
  -e PROMETHEUS_URL=http://prometheus:9090 \
  devops-dashboard:latest
```

#### Using Docker Compose

```bash
docker-compose up -d
```

#### Kubernetes Deployment

The project uses **GitOps** methodology. When you push to `main`:

1. **GitHub Actions** builds Docker image
2. Image pushed to **Docker Hub** with commit SHA tag
3. **GitOps repo** updated with new image tag
4. **ArgoCD/FluxCD** automatically deploys to Kubernetes

---

## 🌐 API Endpoints

### Health & Metrics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/metrics` | Prometheus metrics in exposition format |
| `GET` | `/data/all-metrics` | All available metrics (JSON) |

### Application Metrics

| Method | Endpoint | Description | Environment |
|--------|----------|-------------|-------------|
| `GET` | `/data/cpu` | CPU usage metrics | Local: Node.js / K8s: Container CPU |
| `GET` | `/data/memorary` | Memory usage metrics | Local: Heap / K8s: Container Memory |
| `GET` | `/data/http-requests` | HTTP request statistics | All |
| `GET` | `/data/pods` | Kubernetes pod status | K8s Only |
| `GET` | `/data/deployment` | Kubernetes deployment info | K8s Only |

### Example Response

```json
{
  "data": [
    {
      "method": "GET",
      "route": "/data/cpu",
      "status_code": "200",
      "totalRequests": "42"
    }
  ],
  "query": "http_requests_total"
}
```

---

## 📊 Monitoring & Metrics

### Available Metrics

#### Custom Application Metrics

- `http_requests_total` - Total HTTP requests by method, route, status code
- `http_request_duration_seconds` - HTTP request latency histogram

#### Node.js Process Metrics

- `process_cpu_seconds_total` - CPU time consumed
- `nodejs_heap_size_total_bytes` - Total heap size
- `nodejs_heap_size_used_bytes` - Used heap size
- `nodejs_version_info` - Node.js version information

#### Kubernetes Metrics (Production Only)

- `kube_pod_status_phase` - Pod phase (Running, Pending, Failed)
- `kube_deployment_status_replicas_available` - Available replicas
- `container_cpu_usage_seconds_total` - Container CPU usage
- `container_memory_usage_bytes` - Container memory usage

### Prometheus Configuration

The `prometheus.yml` file configures metric scraping:

```yaml
scrape_configs:
  - job_name: 'nodejs-app'
    static_configs:
      - targets: ['host.docker.internal:3002']
    metrics_path: '/metrics'
    scrape_interval: 15s
```

### Query Examples

Access Prometheus UI at http://localhost:9090 and try:

```promql
# Total requests per minute
rate(http_requests_total[1m])

# 95th percentile request duration
histogram_quantile(0.95, http_request_duration_seconds_bucket)

# Memory usage trend
nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Located at `.github/workflows/prod.yaml`

#### Pipeline Stages

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Checkout  │ -> │Docker Build │ -> │  Push to    │ -> │  Update     │
│    Code     │    │   & Test    │    │ Docker Hub  │    │  GitOps     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

#### Trigger

Automatically runs on:
- Push to `main` branch

#### Workflow Steps

1. **Checkout Source Code**
2. **Docker Hub Login** (using secrets)
3. **Setup Docker Buildx** (for multi-platform builds)
4. **Build & Push Image** with commit SHA tag
5. **Update GitOps Repository** with new image tag

#### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_SECRET` | Docker Hub access token |
| `PAT` | GitHub Personal Access Token (for GitOps repo) |

---

## ⚙️ Environment Variables

Create a `.env` file in the `app/` directory:

```bash
# Prometheus Configuration
PROMETHEUS_URL=http://localhost:9090

# Server Configuration
PORT=3002
NODE_ENV=production

# Optional: Logging
LOG_LEVEL=info
```

### Environment-Specific Values

| Environment | PROMETHEUS_URL |
|-------------|----------------|
| **Local Development** | `http://localhost:9090` |
| **Docker Compose** | `http://prometheus:9090` |
| **Kubernetes** | `http://prometheus-service:9090` |

---

## 🐛 Troubleshooting

### Issue: Empty Metrics Result `{ data: [] }`

**Cause**: Kubernetes metrics not available in local environment

**Solution**: 
1. Test with local metrics: `GET /data/all-metrics`
2. Generate traffic: Make requests to your API endpoints
3. Wait 15-30 seconds for Prometheus to scrape data

### Issue: Cannot Connect to Prometheus

**Check Prometheus is Running**:
```bash
docker ps | grep prometheus
```

**Check Logs**:
```bash
docker logs prometheus
```

**Verify Configuration**:
```bash
curl http://localhost:9090/api/v1/status/config
```

### Issue: Prometheus Target is DOWN

**Verify App is Running**:
```bash
curl http://localhost:3002/metrics
```

**Check Prometheus Config**:
- For local dev: Use `host.docker.internal:3002`
- For Docker network: Use service name
- For Windows: May need `172.17.0.1:3002`

### Issue: Docker Build Fails

**Clear Docker Cache**:
```bash
docker builder prune -a
```

**Rebuild Without Cache**:
```bash
docker build --no-cache -t devops-dashboard ./app
```

---

## 🧪 Testing

### Manual Testing

```bash
# Test metrics endpoint
curl http://localhost:3002/metrics

# Test CPU metrics
curl http://localhost:3002/data/cpu

# Test all available metrics
curl http://localhost:3002/data/all-metrics

# Test HTTP request counter
curl http://localhost:3002/data/http-requests
```

### Prometheus Query Testing

1. Open http://localhost:9090/graph
2. Run queries:
   ```promql
   http_requests_total
   rate(http_requests_total[1m])
   histogram_quantile(0.99, http_request_duration_seconds_bucket)
   ```

---

## 📚 Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [prom-client Library](https://github.com/siimon/prom-client)
- [Express.js Guide](https://expressjs.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Monitoring](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Pankaj Mirdha**
- GitHub: [@mirdha8846](https://github.com/mirdha8846)
- Docker Hub: [pankajmirdha](https://hub.docker.com/u/pankajmirdha)

---

## 🙏 Acknowledgments

- Prometheus community for excellent monitoring tools
- Node.js ecosystem for robust libraries
- Docker for containerization platform

---

**📌 Quick Start Summary**

```bash
# Clone and setup
git clone https://github.com/mirdha8846/devops-dashboard.git
cd devops-dashboard/app && npm install

# Start Prometheus
docker run -d --name prometheus -p 9090:9090 \
  -v ${PWD}/../prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest --config.file=/etc/prometheus/prometheus.yml

# Start app
npm run dev

# Access
# App: http://localhost:3002
# Metrics: http://localhost:3002/metrics
# Prometheus: http://localhost:9090
```

---

Made with ❤️ for DevOps Engineers
