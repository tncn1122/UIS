module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.'
  },],

  deploy: {
    production: {
      user: 'tncn1122',
      host: '54.254.154.61',
      key: 'deploy.key',
      ref: 'origin/main',
      repo: 'git@github.com:tncn1122/UIS.git',
      path: '/var/www/html/UIS',
      'post-deploy':
        'yarn install && pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
