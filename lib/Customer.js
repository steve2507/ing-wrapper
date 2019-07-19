'use strict';

module.exports = (ingWrapper) => {
  class Customer extends ingWrapper.Base {
    getAccounts() {

    }
  }

  return { Customer };
};
