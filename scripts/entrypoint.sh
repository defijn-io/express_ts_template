#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

echo "Running entrypoint.sh..."

# Start the application
yarn start