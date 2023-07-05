require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

function attachLogs(child) {
  child.stdout.on('data', (data) => {
    console.log(data);
  });

  child.stderr.on('data', (data) => {
    console.error(data);
  });

  child.on('close', (code) => {
    console.log(`Application exited with code ${code}`);
  });
}

function copyViewsDirectory() {
  const sourceDirectory = path.join(__dirname, 'src/views');
  const destinationDirectory = '/var/www/express-oauth-mongodb-app/dist/views';

  fs.copySync(sourceDirectory, destinationDirectory, {
    overwrite: true,
    errorOnExist: false,
    recursive: true,
  });
}

const environment = process.env.ENVIRONMENT;
console.log('environment...        ', environment);

console.log('Copying the templates...');
copyViewsDirectory();

console.log('Starting the application...');
if (environment === 'dev') {
  // Run development command
  const child = exec('node ./dist/server.js');
  attachLogs(child);
} else {
  // Run production command
  const child = exec('./node_modules/.bin/pm2-runtime pm2.config.js');
  attachLogs(child);
}
