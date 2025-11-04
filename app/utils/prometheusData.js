import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config(
   {
    file:"./secret/.env"
  }
)
// Use localhost when running Prometheus locally
const PROMETHEUS_URL = process.env.PROMETHEUS_URL || "http://prometheus-svc:9090";

export async function queryPrometheus(query) {
  try {
    const response = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
      params: { query },
    });

    if (response.data.status === "success") {
        console.log(response.data)
      return response.data.data.result;
    } else {
      throw new Error("Prometheus query failed");
    }
  } catch (error) {
    console.error("Error querying Prometheus:", error.message);
    return [];
  }
}