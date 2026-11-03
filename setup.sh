#!/bin/sh
# One-time setup for Linux and macOS.
# Downloads Node 14.21.3 (the exam's Node) into runtime/node14, then installs the puppeteer runtime,
# the React runtime and the IDE with the exact versions in their package-lock.json files.
# Nothing is installed system-wide. Safe to run again.
set -e
cd "$(dirname "$0")"
ROOT=$PWD
NODE_VERSION=14.21.3

case "$(uname -s)" in
  Linux) os=linux ;;
  Darwin) os=darwin ;;
  *) echo "Unsupported OS: $(uname -s). On Windows run setup.cmd instead."; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64 | amd64) arch=x64 ;;
  aarch64 | arm64) arch=arm64 ;;
  *) echo "Unsupported CPU: $(uname -m)"; exit 1 ;;
esac
# Node 14 has no Apple Silicon build; the x64 one runs under Rosetta.
[ "$os" = darwin ] && arch=x64

for tool in curl tar; do
  command -v "$tool" >/dev/null 2>&1 || { echo "Please install $tool first."; exit 1; }
done

if [ ! -x runtime/node14/bin/node ]; then
  name="node-v$NODE_VERSION-$os-$arch"
  echo "==> Downloading $name"
  curl -fL --progress-bar "https://nodejs.org/dist/v$NODE_VERSION/$name.tar.gz" -o "runtime/$name.tar.gz"
  tar -xzf "runtime/$name.tar.gz" -C runtime
  rm -rf runtime/node14 "runtime/$name.tar.gz"
  mv "runtime/$name" runtime/node14
fi
export PATH="$ROOT/runtime/node14/bin:$PATH"
echo "==> Using node $(node -v), npm $(npm -v)"

for dir in runtime/puppeteer runtime/react ide; do
  echo "==> Installing $dir (this can take a few minutes)"
  (cd "$dir" && npm ci --no-audit --no-fund)
done

# Runs one stored solution; stops setup with the full output if it doesn't pass.
check() {
  out=$(node runtime/run-test.js "$@") && code=0 || code=$?
  echo "$out" | tail -n 1
  if [ "$code" -ne 0 ]; then
    echo "$out"
    echo
    echo "Setup check FAILED for $1 (output above). Fix that before using the IDE."
    exit 1
  fi
}
echo "==> Checking: one puppeteer task and one React task"
check tests/w7-cy/solution --test tests/w7-cy/code/puppeteer/test.js
check tests/w10-cod1/solution --test tests/w10-cod1/code/react/tests/App.test.js

echo
echo "Setup done. Start the IDE with:  ./ide.sh   then open http://localhost:4000"
