const ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
const isArray = Array.isArray;
function isStringOrNumber(o) {
    const type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return o === void 0 || o === null;
}
function isInvalid(o) {
    return o === null || o === false || o === true || o === void 0;
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isUndefined(o) {
    return o === void 0;
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(`Inferno Error: ${message}`);
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.error(message);
}
function combineFrom(first, second) {
    const out = {};
    if (first) {
        for (const key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (const key in second) {
            out[key] = second[key];
        }
    }
    return out;
}

export { ERROR_MSG, combineFrom, isArray, isFunction, isInvalid, isNull, isNullOrUndef, isNumber, isString, isStringOrNumber, isUndefined, throwError, warning };
