"use strict";
/* This file is used by the story player, and must be IE-compatible */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = isObject;
exports.flatten = flatten;
exports.unflatten = unflatten;
exports.merge = merge;
exports.deepCopyObject = deepCopyObject;
exports.deepEqual = deepEqual;
exports.getStateChanges = getStateChanges;
function isObject(x) {
    return !Array.isArray(x) && typeof x === "object" && x != null;
}
/* Example: { a: { b: { c: 2, d: 3 } } } ↦
   {
    "a": { b: { c: 2, d: 3 }  },
    "a.b": { c: 2, d: 3 },
    "a.b.c": 2,
    "a.b.d": 3
  }
 */
function flatten(o, keys = [], result = Object.create(null)) {
    const keys_array = [...keys];
    for (var k in o) {
        keys_array.push(k);
        const value = o[k];
        if (typeof value === "object") {
            flatten(value, keys_array, result);
        }
        result[keys_array.join(".")] = o[k];
        keys_array.pop();
    }
    return result;
}
// { "a.b.c": 2, "a.b.d":3 } → { a: { b: { c: 2, d: 3 } } }
function unflatten(o) {
    // Create a new object with no prototype to avoid prototype pollution attacks
    var r = Object.create(null);
    for (var k in o) {
        var t = r;
        for (var i = k.indexOf("."), p = 0; i >= 0; i = k.indexOf(".", p = i + 1)) {
            var s = k.substring(p, i);
            if (!(s in t)) {
                t[s] = Object.create(null);
            }
            t = t[s];
        }
        t[k.substring(p)] = o[k]; // Assign the actual value to the appropriate nested object
    }
    return r;
}
function merge(dest, source) {
    for (const prop in source) {
        if (isObject(dest[prop]) && isObject(source[prop])) {
            merge(dest[prop], source[prop]);
        }
        else {
            dest[prop] = source[prop];
        }
    }
    return dest;
}
function deepCopyObject(obj) {
    if (obj == null) {
        return obj;
    }
    // Create a new object with no prototype to avoid prototype pollution attacks
    var copy = Object.create(null);
    for (var k in obj) {
        const value = obj[k];
        if (Array.isArray(value)) {
            copy[k] = value.slice();
        }
        else if (isObject(obj[k])) {
            copy[k] = deepCopyObject(obj[k]);
        }
        else {
            copy[k] = obj[k];
        }
    }
    return copy;
}
// Simple deep equality test for JSON-definable objects
// The idea is that two objects test equal if they would
// JSON.stringify to the same thing, modulo key ordering.
//
// An edge case implied by the above:
//   { a: 1, b: undefined } counts as equal to { a: 1 }
//
// This is used to compare the slide state to the preview
// state, to see if the state has been changed by user interaction.
function deepEqual(a, b) {
    if (typeof a !== typeof b) {
        return false;
    }
    switch (typeof a) {
        case "string":
        case "boolean":
            return a === b;
        case "number":
            if (isNaN(a) && isNaN(b)) {
                return true;
            }
            return a === b;
        case "object":
            if (a === null) {
                return (b === null);
            }
            if (Array.isArray(a)) {
                if (!Array.isArray(b)) {
                    return false;
                }
                if (a.length != b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    if (!deepEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            if (b === null) {
                return false;
            }
            var k;
            for (k in a) {
                if (!deepEqual(a[k], b[k])) {
                    return false;
                }
            }
            for (k in b) {
                if (!(k in a) && typeof b[k] !== "undefined") {
                    return false;
                }
            }
            return true;
        case "undefined":
            return typeof b === "undefined";
        default:
            return false;
    }
}
function getStateChanges(state1, state2) {
    // Create a new object with no prototype to avoid prototype pollution attacks
    var diff = Object.create(null);
    for (var name in state2) {
        if (!Object.prototype.hasOwnProperty.call(state1, name) || !deepEqual(state1[name], state2[name])) {
            if (isObject(state1[name]) && isObject(state2[name])) {
                diff[name] = getStateChanges(state1[name], state2[name]);
            }
            else {
                diff[name] = state2[name];
            }
        }
    }
    return diff;
}
