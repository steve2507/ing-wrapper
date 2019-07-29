'use strict';

/* List of balance types according to RFC20022.
 * Note that not all of these may be in use by the ING API.
 */
const BALANCE_TYPES = {
  CLOSING_AVAILABLE: 'closingAvailable',
  CLOSING_BOOKED: 'closingBooked',
  EXPECTED: 'expected',
  FORWARD_AVAILABLE: 'forwardAvailable',
  INFORMATION: 'information',
  INTERIM_AVAILABLE: 'interimAvailable',
  INTERIM_BOOKED: 'interimBooked',
  OPENING_AVAILABLE: 'openingAvailable',
  OPENING_BOOKED: 'openingBooked',
  PREVIOUSLY_CLOSED_BOOKED: 'previouslyClosedBooked'
};

module.exports = (ingWrapper) => {
  class Balance extends ingWrapper.Base {
    constructor(obj) {
      super(obj);

      this.parseDateProperties(['lastChangeDateTime']);
    }
  }

  // assign the static balance types.
  Object.assign(Balance, BALANCE_TYPES);

  return { Balance };
};
