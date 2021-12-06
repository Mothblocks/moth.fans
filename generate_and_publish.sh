#!/usr/bin/env bash
set -e

cd "$(dirname "$0")";

if [[ $(git status --porcelain | wc -c) -ne 0 ]]; then
  echo "Uncommitted changes"
  exit 1
fi

powershell.exe -File generate_data.ps1

git add data.json
git commit -m "Update data (automated)"
git push

./publish.sh
