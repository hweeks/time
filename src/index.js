const _ = require('underscore');
const firstKeySort = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  };

/**
 * A class to manage time availability
 */
class TimeManagement {
  /**
   * @description here we intiate our internal times array
   */
  constructor() {
    this.times = [];
  }
  /**
   * @description Here we handle adding the availability
   * @param {Number} start - the first time available
   * @param {Number} end - the last time available
   * @return {Array} the culled and formatted times
   */
  add(start, end) {
    this.configureTimes(
      this.createNumbers(start, end), 'add'
    );
    return this.createSimpleArray();
  }
  /**
   * @description Here we handle removing the availability
   * @param {Number} start - the first time available
   * @param {Number} end - the last time available
   * @return {Array} the culled and formatted times
   */
  remove(start, end) {
    this.configureTimes(
      this.createNumbers(start, end), 'remove'
    );
    return this.createSimpleArray();
  }
  /**
   * @description Here we create an array of all new hours
   * @param {Number} start - the first time available
   * @param {Number} end - the last time available
   * @return {Array} numbers - the built numbers array
   */
  createNumbers(start, end) {
    let numbers = [];
    let i = start;
    if (!_.isNumber(start) || !_.isNumber(end)) {
      throw new Error(
        `You must pass in two numbers, We got: ${start} and ${end}`
      );
    }
    for (i; i <= end - 1; i++) {
      numbers.push([i, i + 1]);
    }
    return numbers;
  }
  /**
   * @description Here we verify there is an internal times object,
   * then we add or remove the new times based on the toggle
   * @param {Array} newNumbers - an array of all the generated times
   * @param {String} toggle - add or remove to handle adding the new times
   */
  configureTimes(newNumbers, toggle) {
    if (this.times.length === 0) {
      if (toggle === 'remove') {
        throw new Error('You cannot remove before you add.');
      }
      this.times = newNumbers;
    } else {
      for (let number of newNumbers) {
        let index = _.findIndex(this.times, number);
        if (toggle === 'add' && index === -1) {
          this.times.push(number);
        } else if (index !== -1 && toggle === 'remove') {
          this.times.splice(index, 1);
        }
      }
      this.times.sort(firstKeySort);
    }
  }
  /**
   * @description Here we look at out internal times array and simplify to
   * match expected output
   * @return {Array} simpleArray - The formatted times array
   */
  createSimpleArray() {
    let simpleArray = [];
    let currentStart;
    let currentEnd;
    this.times.forEach(
      (value, index) => {
        // If we haven't set the start, set it
        if (!currentStart) {
          currentStart = value[0];
        }
        // If there is another value and it's not the following hour, end it
        // here
        if (this.times[index+1] && value[1] !== this.times[index+1][0]) {
          currentEnd = value[1];
        }
        // If there isn't another time and this is the end
        if (!this.times[index+1] && !currentEnd) {
          currentEnd = value[1];
        }
        // Add formatted time if there is a start and finish, and reset the
        // values
        if (currentEnd && currentStart) {
          simpleArray.push([currentStart, currentEnd]);
          currentEnd = null;
          currentStart = null;
        }
      }
    );
    return simpleArray;
  }
}

module.exports = new TimeManagement();
