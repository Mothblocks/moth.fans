#!/usr/bin/env bash
set -e

node build.js
node ./node_modules/gh-pages/bin/gh-pages.js -d dist-release
