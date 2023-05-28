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

const suggestionModal = document.querySelector(".suggestion-modal");

const info__numberOfBooks = document.querySelector(".numberOfBooks");
const info__completedBooks = document.querySelector(".completedBooks");
const info__remainingBooks = document.querySelector(".remainingBooks");

// let formData = new FormData(form);
let bookList = [];

const readyMadeList = [
    { name: "Planning Extreme Programming", author: "Kent Beck", tPages: 162, cPages: 59 },
    { name: "Extreme Programming Installed", author: "Ron Jeffries", tPages: 290, cPages: 80 },
    { name: "Masterminds of Programming", author: "Federico Biancuzzi", tPages: 496, cPages: 23 },
    {
        name: "Programming from the Ground Up",
        author: "Jonathan Bartlett",
        tPages: 320,
        cPages: 73,
    },
    { name: "Logic Programming '89", author: "Koichi Furukawa", tPages: 186, cPages: 33 },
    { name: "Programming Languages", author: "Allen B. Tucker", tPages: 464, cPages: 100 },
    { name: "Practical C++ Programming", author: "Steve Oualline", tPages: 574, cPages: 17 },
    {
        name: "Simulation, Modeling, and Programming for Autonomous Robots",
        author: "Stefano Carpin",
        tPages: 354,
        cPages: 75,
    },
    { name: "Inductive Logic Programming", author: "Dimitar Kazakov", tPages: 145, cPages: 8 },
    {
        name: "Introduction to Microcontroller Programming for Power Electronics Control Applications",
        author: "Mattia Rossi",
        tPages: 452,
        cPages: 37,
    },
    {
        name: "Object-oriented Programming with Prototypes",
        author: "Günther Blaschek",
        tPages: 360,
        cPages: 74,
    },
    {
        name: "Access 2007 VBA Programming For Dummies",
        author: "Joseph C. Stockman",
        tPages: 408,
        cPages: 1,
    },
    {
        name: "Data Science Programming All-in-One For Dummies",
        author: "John Paul Mueller",
        tPages: 768,
        cPages: 3,
    },
    { name: "Functional and Logic Programming", author: "Zhenjiang Hu", tPages: 310, cPages: 73 },
    { name: "Python Programming", author: "John M. Zelle", tPages: 0, cPages: 67 },
    {
        name: "Beginning Object-Oriented Programming with C#",
        author: "Jack Purdum",
        tPages: 624,
        cPages: 33,
    },
    { name: "Computer Programming ( Edition 4 )", author: "Tom Clark", tPages: 626, cPages: 4 },
    { name: "BASIC Programming", author: "Heinz Josef Bomanns", tPages: 740, cPages: 10 },
    { name: "Core Python Programming", author: "Wesley Chun", tPages: 1077, cPages: 49 },
    {
        name: "Goal Programming and Extensions",
        author: "James P. Ignizio",
        tPages: 261,
        cPages: 69,
    },
];

renderCards();

// ************************* HELPER FUNCTIONS **************************

function renderCards() {
    const localStorageData = localStorage.getItem("bookList");
    try {
        bookList = JSON.parse(localStorageData);
    } catch (e) {
        console.log("Error parsing");
    }
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
function showSuggestionModal() {
    suggestionModal.style.display = "block";
}
function hideSuggestionModal() {
    suggestionModal.style.display = "none";
    console.log("should be hidden");
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
    if (!bookList) bookList = [];
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
    if (e.key === "." && e.ctrlKey) showForm();
    if (e.ctrlKey && e.altKey && e.key === "r") populateLibrary();
    if (e.ctrlKey && e.altKey && e.key === "x") clearAndRender();
}
function handleDoubleClick(e) {
    if (e.target.classList.contains("card-content")) removeCard(e);
}

function handleEditForm(e) {
    showEditForm();

    editForm.addEventListener("submit", function (submitEvent) {
        submitEvent.preventDefault();
        handleEditBook(e.target.textContent);
    });

    function showEditForm() {
        editForm.style.display = "block";
        editBookName.focus();
        editForm.reset();
        populateExistingFormData();
    }

    function populateExistingFormData(e) {
        editBookName.setAttribute("value", "Abhishek");
        let endPositionForCursor = editBookName.value?.length;
        editBookName.setSelectionRange(endPositionForCursor, endPositionForCursor);
    }

    function handleEditBook(bookName) {
        if (isFormValid()) {
            hideForm();
            editToDatabase(findBookIndex(e.target.textContent));
            renderCards();
        }
    }
}
function handleSuggestions(e) {
    if (e.key == "/" && e.ctrlKey) showSuggestionModal();
}

function editToDatabase(indexToEdit) {
    const editedBookData = book(
        editBookName.value,
        editBookAuthor.value,
        editCompletedPages.value,
        editTotalPages.value
    );
    editCardOfIndex(indexToEdit, editedBookData);
}

function findBookIndex(bookName) {
    const bookNameList = bookList.map((book) => book.name);
    const requiredIndex = bookNameList.indexOf(bookName);

    return requiredIndex;
}

function editCardOfIndex(indexToEdit, editedBookData) {
    bookList.splice(indexToEdit, 1, editedBookData);
    updateLocalStorage();
    renderCards();
}

function removeCard(e) {
    let indexToDelete = findBookIndex(e.target.firstElementChild.textContent);
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
cardContainer.addEventListener("dblclick", function (e) {
    handleDoubleClick(e);
});
cardContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("book-name")) handleEditForm(e);
});

// #################################### Shortcuts ##############################################
document.addEventListener("keydown", (e) => {
    if (e.key == "/" && e.ctrlKey) showSuggestionModal();
});
document.addEventListener("keyup", (e) => {
    if (e.key == "/" && e.ctrlKey) hideSuggestionModal();
});
document.addEventListener("keydown", function (e) {
    handleShortcuts(e);
});
