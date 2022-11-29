const { VM } = require('vm2');


// for VM execution
const calculateFormulaStringInVM = formulaString => new VM().run(formulaString);


// environment valueMap
const inputString = '#number_1-#number_3===#number_2?#string_1===null?null:#formula_1:#string_2';
const valueMap = {
    string_1: 'annotation là #string_1',
    string_2: 'annotation là #string_2, khác với #string_1 ở chỗ có thêm escape sign \\, và cả các escape quote \"\'\`',
    number_1: 12,
    number_2: 0,
    number_3: -0.5,
    formula_1: '"15" - -0.3 + "#number_3 + 1 - 1" + 2',
};


// pre-process string
const preProcessFormulaString = (string = inputString, map = valueMap) => {
    const splitString =  string.split("#").slice(1);
    console.log(splitString);

    const splitKey = Object.keys(map);
    console.log(splitKey);

    let strRes = "";
    for(const str of splitKey) {
        console.log(str);
        if(str.includes(splitKey)) console.log(splitKey);
    }

    // returning value should be STRING
    return string;
};


// correct result will be #string_2 = 'annotation là #string_2, khác với #string_1 ở chỗ có thêm escape sign \\, và cả các escape quote "\'`'
console.log( calculateFormulaStringInVM( preProcessFormulaString() ) );