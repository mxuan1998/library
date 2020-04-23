const content = document.querySelector(".content");
const addBook = document.querySelector(".add-new");
const formContainer = document.querySelector(".form-container");
const fields = document.querySelectorAll(".field");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const ul = document.querySelector("ul");

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = this.toggleRead.bind(this);
    }
}

Book.prototype.toggleRead = function() {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
}

let library = [];
appendBooks(library);

addBook.addEventListener("click", function() {
    formContainer.removeAttribute("hidden");
});

submit.addEventListener("click", function() {
    let readValue;
    if (formContainer.read.value === "true") {
        readValue = true;
    } else {
        readValue = false;
    }

    let book = new Book (formContainer.title.value, formContainer.author.value, formContainer.pages.value, readValue);
    library.push(book);
    appendBooks(library);
    resetForm();
});

cancel.addEventListener("click", function() {
    resetForm();
})

function resetForm() {
    formContainer.setAttribute("hidden", "true");
    formContainer.reset();
}

function appendBooks(library) {
    let child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }

    for (i = 0; i < library.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("id", library[i]["title"]);
        li.textContent = bookFormat(library[i]);
        deleteButton(li, library[i], i);
        readButton(li, library[i]);
        ul.appendChild(li);
    }
}

function bookFormat(book) {
    if (book["read"] === false) {
        return book["title"] + "by " + book["author"] + ", " + book["pages"] + " pages, not read yet.";
    } else {
        return book["title"] + "by " + book["author"] + ", " + book["pages"] + " pages, already read.";
    }
}

function deleteButton(li, book, index) {
    let button = document.createElement("button");
    button.setAttribute("id", "delete-" + book.title);
    button.textContent = "Delete";
    button.addEventListener("click", function() => {
        library.splice(index, 1);
        document.querySelector("ul").removeChild(document.getElementById(book["title"]));
    });
    li.appendChild(button);
}

function readButton(li, book) {
    let button = document.createElement("button");
    button.setAttribute("id", "read-" + book.title);
    button.textContent = "Read/Unread";
    button.addEventListener("click", function() => {
        book.toggleRead();
        appendBooks(library);
    });
    li.appendChild(button);
}