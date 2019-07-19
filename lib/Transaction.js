'use strict';

module.exports = (ingWrapper) => {
  class Transaction extends ingWrapper.Base {
    constructor(obj) {
      super(obj);

      this.parseDateProperties(['bookingDate', 'valueDate', 'executionDateTime']);
    }
  }

  return { Transaction };
};
