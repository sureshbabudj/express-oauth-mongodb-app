module.exports = {
  apps: [
    {
      name: 'express-oauth-mongodb-app',
      script: 'dist/server.js',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: false,
      watch: false,
      ignore_watch: ['[/\\]./', 'node_modules'],
      max_memory_restart: '200M',
      source_map_support: false,
      instance_var: 'NODE_APP_INSTANCE”',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
