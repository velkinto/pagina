const { NginxConfFile } = require('nginx-conf')

const configFile = './tests/config.conf'

NginxConfFile.create(configFile, (err, conf) => {
  if (err || !conf) {
    console.log(err)
    return
  }

  console.log(conf.nginx)
  console.log('user: ' + conf.nginx.user?.[0]._value);
  conf.nginx.user?.[0]._value = 'www'
  
  // kill process when done writing to disk
  conf.on('flushed', () => {
    console.log('finished writing to disk, exiting');
    process.exit();
  });

  conf.flush();
})