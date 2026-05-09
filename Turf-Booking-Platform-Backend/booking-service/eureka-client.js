const Eureka = require('eureka-js-client').Eureka;

module.exports = function(appName, port) {
  const client = new Eureka({
    instance: {
      app: appName,
      hostName: appName,
      ipAddr: '127.0.0.1',
      statusPageUrl: `http://${appName}:${port}/`,
      port: {
        '$': port,
        '@enabled': 'true',
      },
      vipAddress: appName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: process.env.EUREKA_HOST || 'eureka-server',
      port: process.env.EUREKA_PORT || 8761,
      servicePath: '/eureka/apps/',
    },
  });

  client.start(error => {
    if (error) console.error('Eureka registration failed:', error);
    else console.log(`Eureka registration complete for ${appName}`);
  });

  return client;
};
