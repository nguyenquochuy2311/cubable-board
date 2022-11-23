const board = [ //3
    {
        id: 1,
        name: "Board 1",
    },
    {
        id: 2,
        name: "Board 2"
    },
    {
        id: 3,
        name: "Board 3"
    }
]

const boardItem = [ //2
    {
        id: 1,
        title: "Item 1",
        boardId: 2
    },
    {
        id: 2,
        title: "Item 2",
        boardId: 2
    }
];

const fieldType = {
    id: 1,
    name: "Text"
};

const field = [ //3
    {
        id: 1,
        fieldTypeId: 1,
        boardId: 2,
        name: "Name"
    },
    {
        id: 2,
        fieldTypeId: 1,
        boardId: 2,
        name: "Field 2"
    },
    {
        id: 3,
        fieldTypeId: 1,
        boardId: 2,
        name: "Field 3"
    }
];

const boardItemField = [
    {
        id: 1,
        boardItemId: 1,
        fieldId: 1,
        value: "Item 1"
    },
    {
        id: 2,
        boardItemId: 2,
        fieldId: 1,
        value: "Item 2"
    },
    {
        id: 3,
        boardItemId: 2,
        fieldId: 3,
        value: "demo 2-3"
    }
];

function boardArr(boardId) {
    let boardResult = {};
    let boardItemArr = [];
    let boardFieldArr = [];
    let boardItemFieldArr = [];

    return new Promise((resolve, reject) => {
        // Board
        board.forEach(b => {
            if (boardId === b.id) {
                boardResult = Object.assign({}, { board: b });
            }
        });

        if (!board) reject(null);

        // Board Item
        boardItem.forEach(bi => {
            if (boardId === bi.boardId) {
                boardItemArr.push(bi);
            }
        })

        if (boardItemArr) {
            Object.assign(boardResult, { items: boardItemArr });
        }
        console.log(boardResult.items);

        // Board Field
        field.forEach(f => {
            if (boardId === f.boardId) {
                boardFieldArr.push(f);
            }
        })

        if (boardFieldArr) {
            Object.assign(boardResult, { fields: boardFieldArr });
        }
        console.log(boardResult.fields);

        // Board Item Field
        boardItemField.forEach(bIF => {
            //
        })

        console.log(boardItemField[0]);
        
        resolve(boardResult);
    })
}

const boardResult = boardArr(2);

boardResult.then(res => {
    console.log(res);
}).catch((e => {
    console.log(e);
}))