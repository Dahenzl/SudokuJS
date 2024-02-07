/* console.log("Log de programadorC")

const esPrimo = primo => {
    let cantDiv = 0
    for (let i = 1; i <= primo; i++) {
        if (primo % i == 0) {
            cantDiv ++
        }
    }

    if (cantDiv == 2){
        return true
    }
    return false
}

const cantidad = 15;
let i = 0;
let primoTem = 1;

while (i < cantidad) {
    if(esPrimo(primoTem) && true && i < cantidad) {
        console.log(i+1, "-->", primoTem)
        i++
    }
    primoTem++
}

console.log("Log de master") */

let grid = document.querySelector(".main_grid")

function generateGrid() {
    for (let i = 0; i < 81; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        grid.appendChild(item);
        item.innerHTML = i;
        if (i % 3 == 0 && i % 9 != 0){
            item.style.borderLeft = "solid 0.15em black"
        }
        if(i >= 18 && i <= 26){
            item.style.borderBottom = "solid 0.15em black"
        }
        if(i >= 45 && i <= 53){
            item.style.borderBottom = "solid 0.15em black"
        }
    }
}

generateGrid()
