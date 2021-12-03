module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.'
  },],

  deploy: {
    production: {
      user: 'tncn1122',
      host: '13.250.121.254',
      key: 'deploy.key',
      ref: 'origin/master',
      repo: 'git@github.com:tncn1122/UIS.git',
      path: '/var/www/html/UIS',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout package-lock.lock',
    },
  },
};
