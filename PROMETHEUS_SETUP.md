# Prometheus Setup Guide

## Prerequisites
- Docker aur Docker Compose installed hona chahiye
- Node.js installed hona chahiye

## Setup Steps

### 1. Prometheus Server Start karo (Docker se)

```powershell
# Docker Compose se Prometheus start karo
docker-compose up -d prometheus
```

### 2. Verify Prometheus is running
Browser me jao: `http://localhost:9090`

### 3. Backend Application Start karo

```powershell
# Backend directory me jao
cd backend

# Dependencies install karo (agar nahi kiye)
npm install

# Server start karo
npm run dev
```

### 4. Test Metrics Endpoint
Browser me jao: `http://localhost:3002/metrics`

Tumhe Prometheus format me metrics dikhne chahiye.

## Verification

### Check if Prometheus is scraping your app:
1. Prometheus UI me jao: `http://localhost:9090`
2. Status > Targets par click karo
3. `nodejs-app` target UP hona chahiye

### Test Queries:
Prometheus UI me yeh queries try karo:
```
http_requests_total
http_request_duration_seconds_bucket
process_cpu_seconds_total
nodejs_heap_size_total_bytes
```

## Important URLs
- **Prometheus UI**: http://localhost:9090
- **Node.js Metrics**: http://localhost:3002/metrics
- **API Endpoints**:
  - http://localhost:3002/data/cpu
  - http://localhost:3002/data/memorary
  - http://localhost:3002/data/pods
  - http://localhost:3002/data/deployment

## Troubleshooting

### Agar Prometheus targets me nodejs-app DOWN dikhe:
1. Check karo backend app chal raha hai ya nahi
2. `http://localhost:3002/metrics` browser me check karo
3. Firewall settings check karo

### Agar Kubernetes metrics nahi aa rahe (kube_pod_status_phase, etc.):
- Yeh metrics tab hi aayenge jab tum Kubernetes cluster monitor kar rahe ho
- Agar local development hai, to yeh metrics nahi milenge
- Development ke liye sirf `http_requests_total` aur default Node.js metrics use karo

## Notes
- **Kubernetes Metrics**: Tumhare controller me Kubernetes-specific queries hain (`kube_pod_status_phase`, etc.)
- Yeh metrics tabhi available honge jab Prometheus ek actual Kubernetes cluster ko scrape kar raha ho
- Local development ke liye, sirf Node.js app metrics (`http_requests_total`, process metrics) available honge
