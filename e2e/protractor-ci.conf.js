const baseConf = require('./protractor.conf').config;

const ciConf = {
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800x600"]
    }
  }
}

const config = Object.assign({}, baseConf, ciConf);

exports.config = config;