/**
 * @module WhenDo
 */

'use strict';

/**
 * compose predicate and if else functions to the new function
 * @param {(function|boolean)} predicate - function or anything else that can be treated as bool.
 * @param {function} [trueAction]  - function called if predicate returns true
 * @param {function} [elseAction] - function called if predicate returns false 
 * @returns {function} - composed function that is save to call.
 */
function whenDo(predicate, trueAction, elseAction) {
    if (!isFunction(trueAction) && !isFunction(elseAction)) {
        throw `Expected trueAction or elseAction as function but found ${typeof trueAction}, ${typeof elseAction}`;
    }

    const fTrueAction = asFunc(trueAction),
        fElseAction = asFunc(elseAction);

    if (!isFunction(predicate)) {
        return predicate ? fTrueAction : fElseAction;
    }

    return function ifThenElse() {
        return predicate() ? fTrueAction.apply(null, [...arguments]) : fElseAction.apply(null, [...arguments]);
    }
}

/** Check if items is function
 * @param {*} func
 * @returns {boolean} 
 */
function isFunction(func) {
    return typeof func === 'function';
}

/** Transform item to function
 * @param {*} func
 * @returns {function} 
 */
function asFunc(func) {
    return isFunction(func) ? func : dupeFunc;
}

const dupeFunc = () => null;

module.exports = whenDo;