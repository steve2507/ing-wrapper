'use strict';

module.exports = (ingWrapper) => {
  class Account extends ingWrapper.Base {
    /**
     * Provides all granted accounts and will provide account details for the list of accounts.
     * If there are no granted accounts at all, an empty array is returned.
     * This is contrary to the ING API specification which throws a 404.
     */
    static async getAll() {
      try {
        return await ingWrapper.http
          .get('accounts')
          .toObjectArray(Account);
      } catch (getAccountsErr) {
        if (getAccountsErr.res.statusCode === 404) {
          return [];
        } else {
          throw getAccountsErr;
        }
      }
    }

    /**
     * @param {Object} [options]
     * @param {String} [options.balanceTypes] A list of ISO20022 balance type(s).
     * @param {String} [options.currency] 3 letter ISO Currency Code (ISO 4217) for which transactions are requested.
     * Required in case transactions are requested for a multi-currency account.
     */
    getBalances(options) {
      return ingWrapper.http
        .get(`accounts/${this.accountId}/balances`)
        .toObjectArray(ingWrapper.Balance, options);
    }

    /**
     * @param {Object} [options]
     * @param {Date} [options.dateFrom]
     * @param {Date} [options.dateTo]
     * @param {String} [options.currency] 3 Letter ISO Currency Code (ISO 4217) for which transactions are requested.
     * Required in case transactions are requested for a multi-currency account.
     * @returns {Promise.<>}
     */
    async getTransactions(options) {
      // Transform the dates to iso format as required by the ING API.
      if (options) {
        if (options.dateFrom) {
          options.dateFrom = options.dateFrom.toISOString();
        }

        if (options.dateTo) {
          options.dateTo = options.dateTo.toISOString();
        }
      }

      const res = await ingWrapper.http
        .get(`accounts/${this.accountId}/transactions`)
        .toJson(options);

      return {
        booked: res.transactions.booked ? res.transactions.booked.map(transaction => new ingWrapper.Transaction(transaction)) : [],
        pending: res.transactions.pending ? res.transactions.pending.map(transaction => new ingWrapper.Transaction(transaction)) : [],
        info: res.transactions.info ? res.transactions.info.map(transaction => new ingWrapper.Transaction(transaction)) : []
      }
    }
  }

  return { Account };
};
