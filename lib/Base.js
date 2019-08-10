'use strict';

module.exports = () => {
  class Base {
    constructor(obj) {
      if (obj) {
        Object.assign(this, obj);
      }
    }

    parseDateProperties(propertyNames = []) {
      propertyNames.forEach((propertyName) => {
        if (typeof this[propertyName] !== 'string') {
          return;
        }

        const propertyMatch = this[propertyName].match(/^\d{4}-\d{2}-\d{2}$/);
        if (propertyMatch) {
          this[propertyName] = new Date(
            propertyMatch[1], (+propertyMatch[2]) - 1, propertyMatch[3]
          );
        }

        this[propertyName] = new Date(this[propertyName]);
      });
    }
  }

  return { Base };
};
