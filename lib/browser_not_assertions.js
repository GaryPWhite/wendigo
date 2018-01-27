"use strict";

const assert = require('assert');

function invertify(cb, msg) {
    return cb().then(() => {
        return Promise.reject(new assert.AssertionError({message: msg}));
    }, () => {
        return Promise.resolve();
    });
}

module.exports = class BrowserAssertions {

    constructor(browserAssertions) {
        this._assertions = browserAssertions;
    }


    exists(selector, msg) {
        if(!msg) msg = `Expected element "${selector}" to not exists`;
        return invertify(() => {
            return this._assertions.exists(selector);
        }, msg);
    }

    visible(selector, msg) {
        if(!msg) msg = `Expected element "${selector}" to not be visible`;
        return invertify(() => {
            return this._assertions.visible(selector);
        }, msg);
    }

    text(selector, expected, msg) {
        if(!msg) msg = `Expected element "${selector}" not to have text "${expected}"`;
        return invertify(() => {
            return this._assertions.text(selector, expected);
        }, msg);
    }

    title(expected, msg) {
        if(!msg) msg = `Expected page title not to be "${expected}"`;
        return invertify(() => {
            return this._assertions.title(expected);
        }, msg);
    }

};