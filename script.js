const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    // Reassign event listeners to notes loaded from localStorage
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.addEventListener("keyup", updateStorage);
    });
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "delete.png";
    img.alt = "Delete Note";

    // Append the new note and image, and assign keyup event to update storage
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    inputBox.addEventListener("keyup", updateStorage);
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLinebreak");
        event.preventDefault();
    }
});
