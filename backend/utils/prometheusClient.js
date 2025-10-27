import client from "prom-client"

// Default metrics (CPU, memory, event loop lag, etc.)
client.collectDefaultMetrics()

//now create custom counter and histogram
const requestCounter=new client.Counter({
    name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
})
const requestDuration=new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
})

const register=client.register

export {
    register,
    requestCounter,
    requestDuration,
    client
}