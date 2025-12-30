#!/bin/bash

# Heavy load generator for flights API endpoints
# Runs for 5 minutes hitting multiple airline endpoints

DURATION=300  # 5 minutes in seconds
END_TIME=$(($(date +%s) + DURATION))
ENDPOINTS=(
  "https://localhost:8443/api/flights/flights/AA"
  "https://localhost:8443/api/flights/flights/DL"
  "https://localhost:8443/api/flights/flights/UA"
)

echo "Starting heavy load test for 5 minutes..."
echo "Target endpoints: ${ENDPOINTS[@]}"
echo "Start time: $(date)"

# Function to make requests
make_requests() {
  while [ $(date +%s) -lt $END_TIME ]; do
    for endpoint in "${ENDPOINTS[@]}"; do
      curl -k -s "$endpoint" > /dev/null 2>&1 &
    done
    # Small sleep to avoid overwhelming the system
    sleep 0.1
  done
}

# Run multiple concurrent request generators
NUM_WORKERS=5
for i in $(seq 1 $NUM_WORKERS); do
  make_requests &
  echo "Started worker $i (PID: $!)"
done

# Wait for all background jobs
wait

echo "Load test completed at: $(date)"
echo "Check eBPF logs with: kubectl logs -n monitoring alloy-ebpf-mnbcz -c alloy --since=5m | grep -E 'pprof report|flights'"
