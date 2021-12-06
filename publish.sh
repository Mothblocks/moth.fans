#!/usr/bin/env bash
set -e

cd "$(dirname "$0")";

node build.js
node ./node_modules/gh-pages/bin/gh-pages.js -d dist-release
