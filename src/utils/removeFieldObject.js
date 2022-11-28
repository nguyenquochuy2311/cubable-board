/**
 * @param  {}   object
 * @param  []   array
 * @return {}   object
 */
function removeFieldObject(obj = {}, fields = []) {
    if (!obj || typeof obj !== "object") return {};

    if(!fields || !fields.length) return obj;

    for(const field of fields) {
        delete obj[field];
    }
    return obj;
}

module.exports = { removeFieldObject };