#!/bin/sh
node register.js
exec /bin/node_exporter --web.listen-address=:9100