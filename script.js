let grid = document.querySelector(".main_grid")
let items

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
    if (item != null){
        if (e.key >= 1 && e.key <= 9){
            item.innerHTML = e.key
            items.forEach(other => {
                if(other.innerHTML == item.innerHTML && other.id != item.id && item.innerHTML != ""){
                    other.classList.add("preview-same")
                }
            });
        }
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
