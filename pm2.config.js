module.exports = {
  apps: [
    {
      name: 'express-oauth-mongodb-app',
      script: 'src/index.ts',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      watch: true,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
