#!/bin/sh

set -e

# Perform variable substitution in the default.conf.template file
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
#!/bin/sh


# Start Nginx
exec "$@"
