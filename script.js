// ***************************************************
const generateBtn = document.querySelector(".generate-random-books");

const plus = document.querySelector(".addBook");
const cancelButton = document.querySelectorAll(".cancel");
const form = document.querySelectorAll(".formContainer");

const addForm = document.querySelector("#addForm");
const addBookName = document.getElementById("addBookName");
const addBookAuthor = document.querySelector(".addBookAuthor");
const addTotalPages = document.querySelector(".addTotalPages");
const addCompletedPages = document.querySelector(".addPagesCompleted");

const editForm = document.querySelector("#editForm");
const editBookName = document.getElementById("editBookName");
const editBookAuthor = document.querySelector(".editBookAuthor");
const editTotalPages = document.querySelector(".editTotalPages");
const editCompletedPages = document.querySelector(".editPagesCompleted");

const cardContainer = document.querySelector(".card-container");
const card__readPages = document.querySelector(".read-pages");
const card__addTotalPages = document.querySelector(".total-pages");

const errorMessage_with_X = document.querySelector(".error-message");
const errorMessage_only = document.querySelector(".specific-error");

const bookTitle = document.querySelector(".book-name");
const dustbin = document.querySelector(".info-image");

const info__numberOfBooks = document.querySelector(".numberOfBooks");
const info__completedBooks = document.querySelector(".completedBooks");
const info__remainingBooks = document.querySelector(".remainingBooks");

// let formData = new FormData(form);
let bookList = [];
const readyMadeList = [
    {
        name: "Organize your whiteboard",
        author: "Narendra Bohora",
        tPages: 99,
        cPages: 22,
    },
    {
        name: "How To Control Your Anger",
        author: "Balkrishna Subedi",
        tPages: 127,
        cPages: 38,
    },
    {
        name: "Control Your Students: The Science Of Silent Class",
        author: "Navaraj Negi",
        tPages: 118,
        cPages: 42,
    },
    {
        name: "How to be productive teacher and skip the easy topics",
        author: "Yogesh Raj Subedi",
        tPages: 135,
        cPages: 46,
    },
    {
        name: "The Subtle Art Of Acting",
        author: "Anmol KC",
        tPages: 69,
        cPages: 41,
    },
];

renderCards();

// ************************* HELPER FUNCTIONS **************************

function renderCards() {
    bookList = JSON.parse(localStorage.getItem("bookList"));
    clearCards();
    generateAllCards();
    updateInfo();
}

function updateFromDatabase() {
    if (localStorage.getItem("bookList") === "null") {
        console.log("empty localstorage");
    }
}

function book(name, author, tPages, cPages) {
    return {
        name,
        author,
        tPages,
        cPages,
    };
}
function clearCards() {
    while (cardContainer.firstElementChild.tagName != "BUTTON") {
        cardContainer.removeChild(cardContainer.firstElementChild);
    }
}
function generateAllCards() {
    if (bookList == null) return;
    for (let i = 0; i < bookList.length; i++) {
        cardGenerator(bookList[i].name, bookList[i].author, bookList[i].tPages, bookList[i].cPages);
    }
}
function cardGenerator(book, author, tPages, cPages) {
    let newCard = document.createElement("div");
    cardContainer.insertBefore(newCard, plus);
    newCard.classList.add("card");

    newCard.innerHTML = `
            <!-- content part -->
            <div class="card-content">
              <div class="book-name">${book}</div>
              <div class="author-name">${author}</div>
            </div>
            <!-- footer part -->
            <card class="card-footer relative">
                <p class="footer-text">
                    <span class="read-pages" >${cPages}</span
                    ><span class="total-pages">${tPages}</span>
                </p>
            </card>
          `;
}
// ----------------- Plus and minus button ------------------------
// <div class="control-container">
//     <div class="plusPage">+</div>
//     <div class="minusPage">-</div>
// </div>
// ----------------- Plus and minus button ------------------------

function findCompletedBooks() {
    return bookList?.filter((book) => book.tPages === book.cPages).length;
}
function updateInfo() {
    info__numberOfBooks.textContent = bookList?.length || 0;
    info__completedBooks.textContent = findCompletedBooks() || 0;
    info__remainingBooks.textContent =
        info__numberOfBooks.textContent - info__completedBooks.textContent || 0;
}
function showForm() {
    addForm.style.display = "block";
    addBookName.focus();
    addForm.reset();
}
function showEditForm() {
    editForm.style.display = "block";
    editBookName.focus();
    editForm.reset();
    populateExistingFormData();
}
function populateExistingFormData() {
    editBookName.setAttribute("value", "Abhishek");
    let endPositionForCursor = editBookName.value?.length;
    editBookName.setSelectionRange(endPositionForCursor, endPositionForCursor);
}

function hideForm() {
    form.forEach((aForm) => {
        aForm.style.display = "none";
    });
    hideErrorMessage();
}
function removeAllBooks() {
    if (bookList !== null) bookList.length = 0;
    localStorage.clear();
}
function clearAndRender() {
    removeAllBooks();
    renderCards();
    updateInfo();
}
function showErrorMessage() {
    errorMessage_with_X.style.visibility = "visible";
}
function hideErrorMessage() {
    errorMessage_with_X.style.display = "none";
}
function isFormValid() {
    let isValid = true;

    if (addBookAuthor.value.length > 30) showErrorMessage();
    if (+addCompletedPages.value > +addTotalPages.value) {
        isValid = false;
        showErrorMessage();
    }

    return isValid;
}
function updateLocalStorage() {
    localStorage.setItem("bookList", JSON.stringify(bookList));
}
function addToDatabase() {
    // creating book object
    let bookObj = book(
        addBookName.value,
        addBookAuthor.value,
        addTotalPages.value,
        addCompletedPages.value
    );
    bookList.push(bookObj);
    updateLocalStorage();
}

function handleAddBook(e) {
    e.preventDefault();

    if (isFormValid()) {
        hideForm();
        addToDatabase();
        renderCards();
        updateInfo();
    }
}

function populateLibrary() {
    [...bookList] = [...readyMadeList];
    localStorage.setItem("bookList", JSON.stringify(bookList));
    renderCards();
}
function handleShortcuts(e) {
    if (e.key == "Escape") hideForm();
    if (e.key == "." && e.ctrlKey) showForm();
}
function handleDoubleClick(e) {
    if (e.target.classList.contains("card-content")) removeCard(e);
}
function handleEditForm(e) {
    showEditForm();
    editForm.addEventListener("submit", function (submitEvent) {
        submitEvent.preventDefault();
        handleEditBook(e);
    });

    function handleEditBook(editEvent) {
        if (isFormValid()) {
            hideForm();
            editToDatabase(editEvent);
            renderCards();
        }
    }
    function editToDatabase(editEvent) {
        const selectedBookName = e.target.textContent;
        const bookNameList = bookList.map((book) => book.name);
        const indexToEdit = bookNameList.indexOf(selectedBookName);
        const editedBookData = book(
            editBookName.value,
            editBookAuthor.value,
            editCompletedPages.value,
            editTotalPages.value
        );
        editCardOfIndex(indexToEdit, editedBookData);
    }
}

function editCardOfIndex(indexToEdit, editedBookData) {
    bookList.splice(indexToEdit, 1, editedBookData);
    updateLocalStorage();
    renderCards();
}

function removeCard(e) {
    let selectedBookName = e.target.firstElementChild.textContent;
    let bookNameList = bookList.map((book) => book.name);
    let indexToDelete = bookNameList.indexOf(selectedBookName);

    removeCardOfIndex(indexToDelete);
}
function removeCardOfIndex(indexToDelete) {
    bookList.splice(indexToDelete, 1);
    updateLocalStorage();
    renderCards();
}
//
// #################################### EVENT LISTENERS ##############################################

cancelButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        hideForm();
    });
});
plus.addEventListener("click", () => {
    showForm();
});
dustbin.addEventListener("click", () => {
    clearAndRender();
});
addForm.addEventListener("submit", function (e) {
    handleAddBook(e);
});

generateBtn.addEventListener("click", () => {
    populateLibrary();
});
document.addEventListener("keydown", function (e) {
    handleShortcuts(e);
});
cardContainer.addEventListener("dblclick", function (e) {
    handleDoubleClick(e);
});
cardContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("book-name")) handleEditForm(e);
});
