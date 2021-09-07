const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");
 
const richestPyeople = [
    "Jeff Bezor",
    "Bill Gates",
    "Warren Buffet",
    "Bernard Arnault",
    "Carlos Slim Helu",
    "Amancion Ortega",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Michael Bloomberg",
    "Larry Page"
];

// stor the list items
const listItems = [];

let drageStartIndex;
let dragEndIndex;


//swap list item when drag and drop 
function swapItems (fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//check the order of the list 
function checkOrder () {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable").innerText.trim();

        if (personName !== richestPyeople[index]) {
            listItem.classList.add("wrong")
        } else {
            listItem.classList.remove("wrong")
            listItem.classList.add("right")
        }
    });
}

// event functions 
function dragStart () {
    drageStartIndex = +this.closest("li").getAttribute("data-index");
    console.log(drageStartIndex)
}

function dragOver (e) {
    e.preventDefault();
}

function dragDrop () {
    dragEndIndex = +this.getAttribute("data-index");
    swapItems(drageStartIndex, dragEndIndex);
    this.classList.remove("over")
}

function dragEnter() {
   this.classList.add("over");
}

function dragLeave () {
    this.classList.remove("over");
}

const addEventListeners = () => {
    const checker = document.getElementById("check");
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".draggable-list li")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });

    checker.addEventListener("click", checkOrder)

}

// insert list itmes into DOM
const createList = () => {
    [...richestPyeople]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => { return a.sort - b.sort })
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-index", index);

            listItem.innerHTML = `
                <span class="number"> ${index + 1} </span>
                <div class="draggable" draggable="true">
                    <p class="person-name"> ${person} </p>
                    <i class=""fas fa-grid-lines"></i>
                </div>
            `

            listItems.push(listItem);

            draggableList.appendChild(listItem);
        });
    
        addEventListeners();
}

createList();