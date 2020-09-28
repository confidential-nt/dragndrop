const element = document.getElementsByClassName("jsElement");
const dropZone = document.getElementById("jsDropZone");
const from = document.getElementById("jsFrom");
const form = document.getElementById("jsForm");
const input = document.getElementById("jsInput");

const LOCAL_ITEM = "local-item";

// const ANOTHER_LOCAL_ITEM = "another-local-item";

let itemArray = [];

// let anotherArray = [];

function fromDropHandler(event) {
  const data = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(data);
  from.appendChild(draggableElement);
  event.dataTransfer.clearData();
}

// function anotherSaveItem() {
//   localStorage.setItem(ANOTHER_LOCAL_ITEM, JSON.stringify(anotherArray));
// }

// function anotherPaintItem(text) {
//   const div = document.createElement("div");
//   div.innerText = text;
//   div.classList.add("drag-drop__element");
//   div.classList.add("jsElement");
//   div.setAttribute("draggable", true);
//   const elementID = itemArray.length + 1;
//   div.id = elementID;
//   dropZone.appendChild(div);
//   const anotherItemObj = {
//     id: elementID,
//     text: text,
//   };
//   anotherArray.push(anotherItemObj);
//   anotherSaveItem();
// }

function dropZoneDropHandler(event) {
  const data = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(data);
  dropZone.appendChild(draggableElement);
  event.dataTransfer.clearData();
  // anotherPaintItem(draggableElement.innerText);
}

function dragOverHandler(event) {
  event.preventDefault();
}

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.backgroundColor = "yellow";
  if (event.currentTarget.parentNode === dropZone) {
    event.currentTarget.style.backgroundColor = "#4aae9b";
  }
}

dropZone.addEventListener("dragover", dragOverHandler);
dropZone.addEventListener("drop", dropZoneDropHandler);
from.addEventListener("dragover", dragOverHandler);
from.addEventListener("drop", fromDropHandler);

function saveItem() {
  localStorage.setItem(LOCAL_ITEM, JSON.stringify(itemArray));
}

function paintItem(text) {
  const div = document.createElement("div");
  div.innerText = text;
  div.classList.add("drag-drop__element");
  div.classList.add("jsElement");
  div.setAttribute("draggable", true);
  const elementID = itemArray.length + 1;
  div.id = elementID;
  from.appendChild(div);
  const itemObj = {
    id: elementID,
    text: text,
  };
  itemArray.push(itemObj);
  saveItem();
}

function handleInputElement(event) {
  event.preventDefault();
  const inputElement = input.value;
  paintItem(inputElement);
  input.value = "";
  Array.from(element).forEach((element) =>
    element.addEventListener("dragstart", dragStartHandler)
  );
}

function checkingLS() {
  const currentItem = localStorage.getItem(LOCAL_ITEM);
  if (currentItem !== null) {
    const parsedItem = JSON.parse(currentItem);
    parsedItem.forEach(function (item) {
      paintItem(item.text);
    });
  }
}

function init() {
  form.addEventListener("submit", handleInputElement);
  checkingLS();
}

init();

Array.from(element).forEach((element) =>
  element.addEventListener("dragstart", dragStartHandler)
);
