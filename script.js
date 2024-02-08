let grid = document.querySelector(".main_grid")
let items
let numErrors = 0

document.addEventListener("keydown", putNumber)

function onClick(e) {
    let item = e.target;
    items.forEach(other => {
        other.classList.remove("preview-same")
        other.classList.remove("selected")
        other.classList.remove("preview")
        other.classList.add("unselected")
        if(((other.id % 9 == item.id % 9 || Math.floor(other.id/9) == Math.floor(item.id/9)) || (Math.floor(other.id % 9/3) == Math.floor(item.id % 9/3) && Math.floor(Math.floor(other.id/9)/3) == Math.floor(Math.floor(item.id/9)/3))) && other.id != item.id){
            other.classList.add("preview")
        }
        if(other.innerHTML == item.innerHTML && other.id != item.id && item.innerHTML != ""){
            other.classList.add("preview-same")
        }
    });
    item.classList.add("selected")
    item.classList.remove("unselected")
}

function putNumber(e) {
    let item = document.querySelector(".selected")
    if (item != null && !item.classList.contains("filled")){
        if (e.key >= 1 && e.key <= 9){
            item.innerHTML = e.key
            if(item.classList.contains(e.key)){
                item.classList.add("correct")
                items.forEach(other => {
                    other.classList.remove("preview-same")
                    if(other.innerHTML == item.innerHTML && other.id != item.id && item.innerHTML != ""){
                        other.classList.add("preview-same")
                    }
                });
            } else{
                item.classList.remove("correct")
                item.classList.add("error")
                numErrors++
                items.forEach(other => {
                    other.classList.remove("preview-same")
                    if(other.innerHTML == item.innerHTML && other.id != item.id && item.innerHTML != ""){
                        other.classList.add("preview-same")
                    }
                });
            }
        }
    }
    if (e.key == "Backspace" && !item.classList.contains("filled")){
        item.innerHTML = ""
        item.classList.remove("error")
        item.classList.remove("correct")
        items.forEach(other => {
            other.classList.remove("preview-same")
        });
    }
}

function generateGrid() {
    for (let i = 0; i < 81; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        item.classList.add("unselected");
        item.id = i;
        grid.appendChild(item);
        if (i % 3 == 0 && i % 9 != 0){
            item.style.marginLeft = "0.05em"
            item.style.borderLeft = "0.16em solid gray"
        }
        if(i % 9 == 2 && i != 0){
            item.style.marginRight = "0.05em"
            item.style.borderRight = "0.16em solid gray"
        }
        if(i % 9 == 5){
            item.style.marginRight = "0.05em"
            item.style.borderRight = "0.16em solid gray"
        }
        if(i >= 18 && i <= 26 || i >= 45 && i <= 53 || i >= 72 && i <= 80){
            item.style.marginBottom = "0.05em"
            item.style.borderBottom = "0.16em solid gray"
        }
        if(i >= 27 && i <= 35 || i >= 54 && i <= 62 || i >= 0 && i <= 8){
            item.style.marginTop = "0.05em"
            item.style.borderTop = "0.16em solid gray"
        }
        if (i % 9 == 0){
            item.style.marginLeft = "0.05em"
            item.style.borderLeft = "0.16em solid gray"
        }
        if (i % 9 == 8){
            item.style.marginRight = "0.05em"
            item.style.borderRight = "0.16em solid gray"
        }
        item.addEventListener("click", onClick)
    }
    items = document.querySelectorAll(".grid-item")
}

function generateSudoku() {
    let table = new Array(9).fill(null).map(() => new Array(9).fill(0));
    solveSudoku(table);
    return table;
}

function solveSudoku(table) {
    const emptyCell = findEmptyCell(table);
    const row = emptyCell[0];
    const column = emptyCell[1];

    if (row === -1) {
        return true;
    }

    for (let num = 1; num <= 9; num++) {
        n = Math.floor(Math.random() * 9) + 1
        if (isValid(table, row, column, n)) {
            table[row][column] = n;

            if (solveSudoku(table)) {
                return true; 
            }

            table[row][column] = 0;
        }
    }

    return false;
}

function findEmptyCell(table) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (table[i][j] === 0) {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}

function isValid(table, row, column, num) {
    for (let i = 0; i < 9; i++) {
        if (table[row][i] === num) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (table[i][column] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (table[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

function hideNumbers(sudoku, difficulty) {
    let table = sudoku.map(row => row.slice());

    let numHCell = Math.floor(difficulty * 81 / 100);

    while (numHCell > 0) {
        let row = Math.floor(Math.random() * 9);
        let column = Math.floor(Math.random() * 9);
    
        if (table[row][column] === null) {
            continue;
        }

        let numTemp = table[row][column];
    
        table[row][column] = null;
    
        if (!unicSolution(table)) {
            table[row][column] = numTemp;
            continue;
        }
    
        numHCell--;
    }
    
    return table;
}

function unicSolution(table) {
    let tableCopy = table.map(row => row.slice());
    return solveSudoku(tableCopy);
}

function fillGrid() {
    const table = generateSudoku();
    for (let i = 0; i < 81; i++){
        items[i].classList.add(table[Math.floor(i/9)][i%9])
    }
    const hideTable = hideNumbers(table, 50);
    for (let i = 0; i < 81; i++){
        items[i].innerHTML = hideTable[Math.floor(i/9)][i%9]
        if(items[i].innerHTML != ""){
            items[i].classList.add("filled")
        }
    }
}

generateGrid()
fillGrid()

