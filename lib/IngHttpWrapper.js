'use strict';

const sha256 = require('crypto').createHash('sha256');
const oohttp = require('oohttp');

class IngHttpWrapper extends oohttp.Base {
  /**
   * Override the createSendBody method so we can generate a digest
   * and set it as the 'Digest' header.
   */
  createSendBody(data) {
    const sendBody = super.createSendBody(data);

    // set the digest header
    const digest = sha256.update(sendBody).digest('base64');
    this.headers.Digest = `SHA-256=${digest}`;

    return sendBody;
  }

  /**
   * Override the send method so we can set a Date header for every call.
   */
  send(data) {
    // set the date header
    this.headers.Date = new Date().toUTCString();

    // set the request-target
    this.headers['request-target'] = `${this.method} ${this.url.pathname}`;

    // add a uuid
    this.headers['X-Request-ID'] = '';

    return super.send(data);
  }
}

module.exports = IngHttpWrapper;
