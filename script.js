const plus = document.querySelector(".addBook"); 
const form = document.querySelector(".formContainer");
const cancelButton = document.querySelector(".cancel");
const theForm = document.querySelector("form");
let submitButton = document.querySelector(".submit");
let bookName = document.querySelector(".bookName");
let bookAuthor = document.querySelector(".bookAuthor");
let totalPages = document.querySelector(".totalPages");
let completedPages = document.querySelector(".pagesCompleted");
let displayBookName = document.querySelector(".book-name");
let card__readPages = document.querySelector(".read-pages");
let card__totalPages = document.querySelector(".total-pages");

let formData = new FormData(form);


let cardContainer = document.querySelector(".card-container");

// ***************************************************

let bookList = JSON.parse(localStorage.getItem("bookList"));

renderCards();

// Factory function
function book(name, author, tPages, cPages) {
	return {
		name,
		author,
		tPages, 
		cPages
	}
}

plus.addEventListener("click", function() {
	form.setAttribute("style", "visibility: visible");
});

cancelButton.addEventListener("click", function() {
	form.setAttribute("style", "visibility: hidden");
})

submitButton.addEventListener("click", () => {
	// getting value from form and making an object to push in bookList
	let book1 = book(bookName.value, bookAuthor.value, totalPages.value, completedPages.value); 	
	bookList.push(book1);
	localStorage.setItem("bookData", JSON.stringify(bookList));
	
	console.clear();
	console.log(book1);
	
	// cardGenerator(bookName.value, bookAuthor.value, totalPages.value, completedPages.value);
	renderCards();
	
	form.setAttribute("style", "visibility: hidden");
});


function renderCards() {
	for(let i=0; i<bookList.length; i++) {
		cardGenerator(bookList[i].name, bookList[i].author, bookList[i].tPages, bookList[i].cPages);
	}
}

function cardGenerator(book, author, tPages, cPages) {

	// 1. create a card 
	let newCard = document.createElement("div");
	cardContainer.insertBefore(newCard,plus);
	newCard.classList.add("card");


	// 2. create content part 
	let newCardContent = document.createElement("div");
	newCard.appendChild(newCardContent);
	newCardContent.classList.add("card-content");


	// 3. create footer
	let newCardFooter = document.createElement("div");
	newCard.appendChild(newCardFooter);
	newCardFooter.classList.add("card-footer");


	// 4. create book and author name section
	let newCardBookName = document.createElement("div");
	let newCardAuthorName = document.createElement("div");

	// appending them inside card 
	newCardContent.appendChild(newCardBookName);
	newCardContent.appendChild(newCardAuthorName);

	// adding class to book and author
	newCardBookName.classList.add("book-name");
	newCardAuthorName.classList.add("author-name");


	// to update their value
	newCardBookName.textContent = book;
	newCardAuthorName.textContent = author;

	// 5. creating total and completed pages
	let newCardTotalPages = document.createElement("div");
	let newCardCompletedPages = document.createElement("div");

	// appending them inside footer
	newCardFooter.appendChild(newCardCompletedPages);
	newCardFooter.appendChild(newCardTotalPages);

	// adding class
	newCardTotalPages.classList.add("total-pages");
	newCardCompletedPages.classList.add("read-pages");

	// adding content
	newCardTotalPages.textContent = tPages;
	newCardCompletedPages.textContent = cPages;
}	