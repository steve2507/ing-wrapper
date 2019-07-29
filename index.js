const IngHttpWrapper = require('lib/IngHttpWrapper');

class IngWrapper {
  constructor({ url, customerAccessToken }) {
    if (!url) {
      this.url = 'https://api.ing.com';
    } else {
      this.url = url;
    }

    this.customerAccessToken = customerAccessToken;

    this.init();
  }

  init() {
    initHttp();
    initLib();
  }

  /**
   * Setup a base http handler.
   */
  initHttp() {
    this.http = new IngHttpWrapper('api.ing.com/v2/');
    this.http.headers['Authorization'] = this.customerAccessToken;
  }

  /**
   * Iniatate all lib classes.
   */
  initLib() {
    Object.assign(this, require('lib/Base.js')(this));
    Object.assign(this, require('lib/Customer.js')(this));
    Object.assign(this, require('lib/Account.js')(this));
    Object.assign(this, require('lib/Balance.js')(this));
    Object.assign(this, require('lib/Transaction.js')(this));
  }
}

module.exports = IngWrapper;
