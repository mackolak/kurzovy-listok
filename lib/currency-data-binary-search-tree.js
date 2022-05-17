class Node {
  constructor({ date, data }) {
    this.conversionRateDate = date;
    this.currencyRates = data;
    this.left = null;
    this.right = null;
  }

  isNewConversionRateDateSmaller({ conversionRateDate }) {
    return conversionRateDate < this.conversionRateDate;
  }

  isLeftNodeEmpty() {
    return this.left === null;
  }

  isRightNodeEmpty() {
    return this.right === null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  searchForCurrencyDate({ unixDate: conversionRateDate }) {
    if (this.isRootEmpty()) return undefined;
    let temp = this.root;

    while (temp) {
      if (temp.conversionRateDate === conversionRateDate) return temp;

      if (temp.isNewConversionRateDateSmaller({ conversionRateDate })) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    return undefined;
  }

  insert(date, data) {
    const newNode = new Node({ date, data });

    if (this.isRootEmpty()) {
      this.root = newNode;
      return newNode;
    }

    let temp = this.root;

    while (true) {
      if (temp.conversionRateDate === newNode.conversionRateDate)
        return undefined;

      if (temp.isNewConversionRateDateSmaller(newNode)) {
        if (temp.isLeftNodeEmpty()) {
          temp.left = newNode;
          return newNode;
        }
        temp = temp.left;
      } else {
        if (temp.isRightNodeEmpty()) {
          temp.right = newNode;
          return newNode;
        }
        temp = temp.right;
      }
    }
  }

  isRootEmpty() {
    return this.root === null;
  }
}

module.exports = BinarySearchTree;
