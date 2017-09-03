const {assert} = require('chai');
const timeManager = require('./index');

describe('TimeManager email tests work', () => {
  it('throws an error if remove', () => {
    let message;
    try {
      timeManager.configureTimes([], 'remove');
    } catch (e) {
      message = e;
    }
    assert.isNotNull(message);
  });
  it('Adds a first time', () => {
    assert.deepEqual(timeManager.add(1, 5), [[1, 5]]);
  });
  it('Removes a first time', () => {
    assert.deepEqual(timeManager.remove(2, 3), [[1, 2], [3, 5]]);
  });
  it('Adds a second time', () => {
    assert.deepEqual(timeManager.add(6, 8), [[1, 2], [3, 5], [6, 8]]);
  });
  it('Removes a second time', () => {
    assert.deepEqual(timeManager.remove(4, 7), [[1, 2], [3, 4], [7, 8]]);
  });
  it('Adds a final time', () => {
    assert.deepEqual(timeManager.add(2, 7), [[1, 8]]);
  });
  it('Handles removing all times', () => {
    assert.deepEqual(timeManager.remove(1, 8), []);
  });
  it('Adds adding back time', () => {
    assert.deepEqual(timeManager.add(2, 7), [[2, 7]]);
  });
  it('Handles building single numbers', () => {
    assert.deepEqual(timeManager.createNumbers(1, 2), [[1, 2]]);
  });
  it('Handles building multiple numbers', () => {
    assert.deepEqual(
      timeManager.createNumbers(3, 7), [[3, 4], [4, 5], [5, 6], [6, 7]]
    );
  });
  it('throws an error if numbers are not passed', () => {
    let message;
    try {
      timeManager.createNumbers('test');
    } catch (e) {
      message = e;
    }
    assert.isNotNull(message);
  });
  it('throws an error if only remove', () => {
    let testInternal = require('./index');
    let message;
    try {
      testInternal.remove(1, 2);
    } catch (e) {
      message = e;
    }
    assert.isNotNull(message);
  });
  it('throws an error if non-numbers are passed', () => {
    let testInternal = require('./index');
    let message;
    try {
      testInternal.remove(null, 'test');
    } catch (e) {
      message = e;
    }
    assert.isNotNull(message);
  });
});
