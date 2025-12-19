#!/bin/sh

# Replace placeholders in env-config.js with actual environment variables
sed -i "s|PLACEHOLDER_FARO_URL|${REACT_APP_FARO_URL}|g" /usr/share/nginx/html/env-config.js
sed -i "s|PLACEHOLDER_VERSION|${REACT_APP_VERSION}|g" /usr/share/nginx/html/env-config.js
sed -i "s|PLACEHOLDER_ENVIRONMENT|${REACT_APP_ENVIRONMENT}|g" /usr/share/nginx/html/env-config.js

# Start nginx
exec nginx -g 'daemon off;'
