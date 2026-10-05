#!/usr/bin/env bash
set -euo pipefail

OLLAMA_URL="${OLLAMA_BASE_URL:-http://127.0.0.1:11434}"
OLLAMA_URL="${OLLAMA_URL%/}"
OLLAMA_MODEL_NAME="${OLLAMA_MODEL:-gemma3:4b}"
STARTED_OLLAMA=0
OLLAMA_PID=""

say() {
  printf "\n\033[1;33m%s\033[0m\n" "$1"
}

cleanup() {
  if [[ "$STARTED_OLLAMA" -eq 1 && -n "$OLLAMA_PID" ]]; then
    echo
    echo "Stopping Ollama started by Post Studio..."
    kill "$OLLAMA_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

say "Starting Post Studio"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Run: npm run setup:local"
  exit 1
fi

if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama is not installed. Run: npm run setup:local"
  exit 1
fi

if ! curl -fsS "$OLLAMA_URL/api/tags" >/dev/null 2>&1; then
  say "Starting Ollama automatically"
  ollama serve >/tmp/post-studio-ollama.log 2>&1 &
  OLLAMA_PID=$!
  STARTED_OLLAMA=1

  for _ in {1..20}; do
    if curl -fsS "$OLLAMA_URL/api/tags" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done
fi

if ! curl -fsS "$OLLAMA_URL/api/tags" >/dev/null 2>&1; then
  echo "Could not start Ollama."
  echo "Check: /tmp/post-studio-ollama.log"
  exit 1
fi

say "Checking model: $OLLAMA_MODEL_NAME"
if ! ollama list 2>/dev/null | awk 'NR > 1 {print $1}' | grep -Fxq "$OLLAMA_MODEL_NAME"; then
  echo "Model is missing. Downloading it once..."
  ollama pull "$OLLAMA_MODEL_NAME"
else
  echo "Model ready."
fi

if [[ "${IMAGE_PROVIDER:-drawthings}" == "drawthings" ]]; then
  if command -v draw-things-cli >/dev/null 2>&1; then
    echo "Draw Things CLI ready. It will run only when you generate an image."
  else
    echo "Warning: Draw Things CLI is not installed."
    echo "Text generation will still work. Run npm run setup:local to install image generation."
  fi
fi

say "Opening development server"
echo "Ollama: $OLLAMA_URL"
echo "Model : $OLLAMA_MODEL_NAME"
echo "App   : http://localhost:3000"
echo
echo "Press Ctrl+C once to stop Post Studio."
echo

npm run dev
