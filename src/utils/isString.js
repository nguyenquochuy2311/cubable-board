/**
 * @param  _                    primitive type || reference type
 * @return true || false        boolean
 */
const isString = (s) => {
    return typeof s === "string" || s instanceof String;
};

module.exports = { isString };