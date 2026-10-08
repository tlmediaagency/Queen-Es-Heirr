#!/bin/sh
# Restart contract: bring up the app on 0.0.0.0:8080 if it is not already healthy.
set -eu
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev > /tmp/queen-e-dev.log 2>&1 &
for i in $(seq 1 40); do
  if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
    exit 0
  fi
  sleep 0.5
done
exit 1
