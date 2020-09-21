const element1 = document.getElementById("jsElement-1");

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

element1.addEventListener("dragstart", dragStartHandler);
