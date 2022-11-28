const removePropertyObject = (obj = {}, fields = []) => {
    
    return new Promise((resolve, reject) => {
        if(!obj || !fields || !fields.length) return reject(null);

        fields.forEach((field) => {
            if(obj[field]) delete obj;
        });

        resolve(obj);
    })
    
}

module.exports = { removePropertyObject };