const { VM } = require('vm2');

// for VM execution
const calculateFormulaStringInVM = formulaString => new VM().run(formulaString);


// environment valueMap
const inputString = '#number_1-#number_3===#number_2?#string_1===null?null:#formula_1:#string_2';
const valueMap = {
    string_1: 'annotation là #string_2',
    string_2: 'annotation là #string_2, khác với #string_1 ở chỗ có thêm escape sign \\, và cả các escape quote \"\'\`',
    number_1: 12,
    number_2: 0,
    number_3: -0.5,
    formula_1: '"15" - -0.3 + "#number_3 + 1 - 1" + 2',
};

// pre-process string
const preProcessFormulaString = (string = inputString, map = valueMap) => {

    if (!string) return;
    if (!map) return string;

    /** Mapping */
    for (const value in map) {
        let tempStr = string;

        /** Handle map value data type */
        if (typeof map[value] === "number" && map[value] < 0) {
            map[value] = `(${map[value]})`;
        } else if (typeof map[value] === "string") {
            map[value] = `'${map[value]}'`;
        }
        /** End handle map value data type */

        let temp = tempStr.replaceAll(`#${value}`, map[value]);
        string = temp;
    }

    /** Add '\\' and delete ` */
    const strObj = new String(string);
    const strObjValue = Object.values(strObj);
    for (let i = 0; i < strObjValue.length; i++) {
        const charCodeAt = strObjValue[i].charCodeAt();
        if (charCodeAt === 39 ||
            charCodeAt === 34 ||
            charCodeAt === 92) {
            strObjValue[i] = `\\${strObjValue[i]}`;
        } else if (charCodeAt === 96) {
            delete strObjValue[i];
        }
    }

    let res = strObjValue.join('');

    const conLast = res.split(":");
    if (!conLast) return `'${res}'`;

    const strLast = conLast[conLast.length - 1];
    if(typeof strLast === "string") {
        const lastCon = res.lastIndexOf(":") + 1;
        let temp = res.slice(lastCon, res.length - 1);
        let temp1 = temp;
        temp = temp1.replaceAll("\\'", "");
        res = res.slice(0, lastCon);
        res += `\\'${temp}'`;
    }
    return `'${res}'`;
};

resMap = "";

const res = preProcessFormulaString();
console.log(res);


// correct result will be #string_2 = 'annotation là #string_2, khác với #string_1 ở chỗ có thêm escape sign \\, và cả các escape quote "\'`'
console.log(calculateFormulaStringInVM(res));

