#!/usr/bin/env bash
set -euo pipefail

echo "Post Studio local AI check"
echo

printf "Node: "
node --version

printf "Ollama: "
ollama --version || true

printf "Ollama API: "
if curl -fsS http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  echo "OK"
else
  echo "NOT REACHABLE"
fi

printf "Draw Things CLI: "
if draw-things-cli --help >/dev/null 2>&1; then
  echo "OK"
else
  echo "NOT FOUND"
fi

echo
echo "Configured models:"
echo "  Ollama: ${OLLAMA_MODEL:-gemma3:4b}"
echo "  Draw Things: ${DRAWTHINGS_MODEL:-flux_2_klein_4b_q8p.ckpt}"
