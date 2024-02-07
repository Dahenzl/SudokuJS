let grid = document.querySelector(".main_grid")
let items

function onClick(e) {
    items.forEach(item => {
        item.classList.remove("selected")
    });
    let item = e.target;
    item.classList.toggle("selected")
    item.classList.toggle("unselected")
}

function generateGrid() {
    for (let i = 0; i < 81; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        item.classList.add("unselected");
        grid.appendChild(item);
        item.innerHTML = i;
        if (i % 3 == 0 && i % 9 != 0){
            item.style.marginLeft = "0.1em"
            item.style.borderLeft = "0.2em solid gray"
        }
        if(i % 9 == 2 && i != 0){
            item.style.marginRight = "0.1em"
            item.style.borderRight = "0.2em solid gray"
        }
        if(i % 9 == 5){
            item.style.marginRight = "0.1em"
            item.style.borderRight = "0.2em solid gray"
        }
        if(i >= 18 && i <= 26 || i >= 45 && i <= 53 || i >= 72 && i <= 80){
            item.style.marginBottom = "0.1em"
            item.style.borderBottom = "0.2em solid gray"
        }
        if(i >= 27 && i <= 35 || i >= 54 && i <= 62 || i >= 0 && i <= 8){
            item.style.marginTop = "0.1em"
            item.style.borderTop = "0.2em solid gray"
        }
        if (i % 9 == 0){
            item.style.marginLeft = "0.1em"
            item.style.borderLeft = "0.2em solid gray"
        }
        if (i % 9 == 8){
            item.style.marginRight = "0.1em"
            item.style.borderRight = "0.2em solid gray"
        }
        item.addEventListener("click", onClick)
    }
    items = document.querySelectorAll(".grid-item")
}

generateGrid()
