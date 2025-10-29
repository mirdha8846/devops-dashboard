import { json } from "express"
import { queryPrometheus } from "../utils/prometheusData.js"

// For local development - Node.js app metrics
export const cpu=async(req,res)=>{
  // Try Node.js process CPU metric first (for local dev)
  let query = 'rate(process_cpu_seconds_total[1m])';
  let result = await queryPrometheus(query);
  
  // If no result, try Kubernetes metrics (for production)
  if (result.length === 0) {
    query = 'sum(rate(container_cpu_usage_seconds_total[2m])) by (pod)';
    result = await queryPrometheus(query);
  }

  const formatted = result.map((r) => ({
    pod: r.metric.pod || r.metric.job || "nodejs-app",
    cpu: parseFloat(r.value[1]).toFixed(4),
  }));

  res.json({ data: formatted, query: query });
}
export const memo=async(req,res)=>{
  // Try Node.js heap memory metric first (for local dev)
  let query = 'nodejs_heap_size_total_bytes';
  let result = await queryPrometheus(query);
  
  // If no result, try Kubernetes metrics (for production)
  if (result.length === 0) {
    query = 'sum(container_memory_usage_bytes) by (pod)';
    result = await queryPrometheus(query);
  }

  const formatted = result.map((r) => ({
    pod: r.metric.pod || r.metric.job || "nodejs-app",
    memoryMB: (parseFloat(r.value[1]) / 1024 / 1024).toFixed(2),
  }));

  res.json({ data: formatted, query: query });
}
export const pods=async(req,res)=>{
      const query = 'kube_pod_status_phase';
  const result = await queryPrometheus(query);

  const formatted = result.map((r) => ({
    pod: r.metric.pod || "unknown",
    namespace: r.metric.namespace || "default",
    phase: r.metric.phase || "unknown",
    value: r.value[1],
  }));

  res.json({ data: formatted });
}

export async function deployment(req, res) {
  const query = 'kube_deployment_status_replicas_available';
  const result = await queryPrometheus(query);

  const formatted = result.map((r) => ({
    deployment: r.metric.deployment || "unknown",
    availableReplicas: r.value[1],
  }));

  res.json({ data: formatted });
}

// New endpoint for local development - HTTP request metrics
export async function httpRequests(req, res) {
  const query = 'http_requests_total';
  const result = await queryPrometheus(query);

  const formatted = result.map((r) => ({
    method: r.metric.method || "unknown",
    route: r.metric.route || "unknown",
    status_code: r.metric.status_code || "unknown",
    totalRequests: r.value[1],
  }));

  res.json({ data: formatted, query: query });
}

// Get all available metrics (for debugging)
export async function allMetrics(req, res) {
  try {
    const queries = [
      'http_requests_total',
      'http_request_duration_seconds_count',
      'process_cpu_seconds_total',
      'nodejs_heap_size_total_bytes',
      'nodejs_version_info'
    ];

    const results = {};
    for (const query of queries) {
      const result = await queryPrometheus(query);
      if (result.length > 0) {
        results[query] = result;
      }
    }

    res.json({ 
      availableMetrics: Object.keys(results),
      data: results 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
