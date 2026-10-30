#!/bin/sh
# Starts the practice IDE on http://localhost:4000 (tests run on the Node 14 in runtime/node14).
cd "$(dirname "$0")" || exit 1
if [ ! -x runtime/node14/bin/node ] || [ ! -d ide/node_modules ]; then
  echo "Not set up yet. Run ./setup.sh first."
  exit 1
fi
exec ./runtime/node14/bin/node ide/server.js
