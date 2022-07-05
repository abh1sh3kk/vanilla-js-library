// ***************************************************
const generateBtn = document.querySelector(".generate-random-books");


const plus = document.querySelector(".addBook"); 
const form = document.querySelector(".formContainer");
const cancelButton = document.querySelector(".cancel");
const theForm = document.querySelector("form");
const submitButton = document.querySelector(".submit");


const bookName = document.querySelector(".bookName");
const bookAuthor = document.querySelector(".bookAuthor");
const totalPages = document.querySelector(".totalPages");
const completedPages = document.querySelector(".pagesCompleted");

const cardContainer = document.querySelector(".card-container");
const card__readPages = document.querySelector(".read-pages");
const card__totalPages = document.querySelector(".total-pages");

const errorMessage_with_X = document.querySelector(".error-message");
const errorMessage_only = document.querySelector(".specific-error");

const displayBookName = document.querySelector(".book-name");
const dustbin = document.querySelector(".info-image");

const info__numberOfBooks = document.querySelector(".numberOfBooks");
const info__completedBooks = document.querySelector(".completedBooks");
const info__remainingBooks = document.querySelector(".remainingBooks");

let formData = new FormData(form);
let bookList = [];
const readyMadeList = [{
		"name": "Organize your whiteboard", 
		"author": "Narendra Bohora", 
		"tPages": 99,
		"cPages": 22
	}, 
	{
		"name": "How To Control Your Anger", 
		"author": "Balkrishna Subedi", 
		"tPages": 127,
		"cPages": 38
	},
	{
		"name": "Control Your Students: The Science Of Silent Class", 
		"author": "Navaraj Negi", 
		"tPages": 118,
		"cPages": 42
	},
	{
		"name": "How to be productive teacher and skip the easy topics", 
		"author": "Yogesh Raj Subedi", 
		"tPages": 135,
		"cPages": 46
	},
	{
		"name": "The Subtle Art Of Acting", 
		"author": "Anmol KC", 
		"tPages": 69,
		"cPages": 41
	},
	
];



// ************************* HELPER FUNCTIONS **************************

function renderCards() {
	// updateFromDatabase();
	bookList = JSON.parse(localStorage.getItem("bookList"));
	console.table("haha", bookList);
	clearCards();
	generateAllCards();
	updateInfo();
} renderCards();
function updateFromDatabase(){
	if (localStorage.getItem("bookList") === 'null') {
		console.log("empty localstorage")
	}
}
function book(name, author, tPages, cPages) {
	return {
		name,
		author,
		tPages, 
		cPages
	}
}
function clearCards() {
	while(cardContainer.firstElementChild.tagName != "BUTTON") {
		cardContainer.removeChild(cardContainer.firstElementChild);
	}
}
function generateAllCards() {
	if(bookList == null) return;
	for(let i = 0; i<bookList.length; i++) {
		cardGenerator(bookList[i].name, bookList[i].author, bookList[i].tPages, bookList[i].cPages);
	}
}
function cardGenerator(book, author, tPages, cPages) {

	let newCard = document.createElement("div");
	cardContainer.insertBefore(newCard,plus);
	newCard.classList.add("card");

	newCard.innerHTML = `
            <!-- content part -->
            <div class="card-content">
              <div class="book-name">${book}</div>
              <div class="author-name">${author}</div>
            </div>
            <!-- footer part -->
            <card class="card-footer">
              <p class="footer-text">
                <span class="read-pages">${cPages}</span
                ><span class="total-pages">${tPages}</span>
              </p>
            </card>
          `
}
function updateInfo() {
	if (bookList == null) return;
	info__numberOfBooks.textContent = bookList.length;
}	
function showForm(){
	form.style.visibility = "visible";
};
function hideForm(){ 
	form.style.visibility = "hidden";
	hideErrorMessage();
}
function removeAllBooks(){
	bookList.length = 0;
	localStorage.clear();
}
function clearAndRender(){
	removeAllBooks();
	renderCards();
}
function showErrorMessage(){
	errorMessage_with_X.style.visibility = "visible"; 
}
function hideErrorMessage(){
	errorMessage_with_X.style.display = "none"; 
}
function isFormValid(){
	let isValid = true;

	if (bookAuthor.value.length > 30) showErrorMessage();
	if (+completedPages.value > +totalPages.value) {
		isValid = false;
		showErrorMessage();
	}

	return isValid;
}
function updateLocalStorage(){
	localStorage.setItem("bookList", JSON.stringify(bookList));
}
function updateToDatabase(){
	// creating book object
	let bookObj = book(
		bookName.value, 
		bookAuthor.value, 
		totalPages.value, 
		completedPages.value); 	

	bookList.push(bookObj);

	updateLocalStorage();	
}
function handleForm(e){
	e.preventDefault();
	
	if (isFormValid()) { 
		hideForm();
		updateToDatabase();
		renderCards();
		updateInfo();
	}	
}
function populateLibrary(){
		[... bookList] = [... readyMadeList];
		console.table(bookList);
		localStorage.setItem("bookList", JSON.stringify(bookList));
		renderCards();
}

// #################################### EVENT LISTENERS ##############################################

plus.addEventListener("click", () => { showForm() });
cancelButton.addEventListener("click", ()=> { hideForm() });
dustbin.addEventListener("click", () => { clearAndRender() });
theForm.addEventListener("submit", function(e) { handleForm(e) });
generateBtn.addEventListener("click", ()=> { populateLibrary() });