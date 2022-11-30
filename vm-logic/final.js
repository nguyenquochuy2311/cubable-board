const inputString = '#number_1-#number_3===#number_2?#string_1===null?null:#formula_1:#string_2';
const valueMap = {
    string_1: 'annotation là #string_2',
    string_2: 'annotation là #string_2, khác với #string_1 ở chỗ có thêm escape sign \\, và cả các escape quote \"\'\`',
    number_1: 12,
    number_2: 0,
    number_3: -0.5,
    formula_1: '"15" - -0.3 + "#number_3 + 1 - 1" + 2',
};

/** prepare */
let pointer = 0;

let result = "";
/** ------- */

for (const input of inputString) {

    if (input === "#") {

    }

}



