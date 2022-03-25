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

let bookList = []; 

let book = {
	name: "science",
	author: "koi na koi",
	tPages: "212", 
	cPages: 300
};
cancelButton.addEventListener("click", function() {
	form.setAttribute("style", "visibility: hidden");
})

plus.addEventListener("click", function() {
	form.setAttribute("style", "visibility: visible");
});
submitButton.addEventListener("click", () => {
	let book1 = Object.create(book);
	
	book1.name = bookName.value;
	book1.author = bookAuthor.value;
	book1.tPages = totalPages.value; 
	book1.cPages = completedPages.value; 
	
	bookList.push(book1);
	
	console.clear();
	console.log(book1);
	
	displayBookName.value = book1.name;
	
	console.log("submitted");
	cardGenerator("How to make library in js", "- Abhishek Acharya", "6969", "69");

	form.setAttribute("style", "visibility: hidden");
});

function cardGenerator(book, author, tPages, cPages) {

	// create a card
	let newCard = document.createElement("div");
	cardContainer.insertBefore(newCard,plus);
	newCard.classList.add("card");

	// create content part 
	let newCardContent = document.createElement("div");
	newCard.appendChild(newCardContent);
	newCardContent.classList.add("card-content");

	// create book and author name section
	let newCardBookName = document.createElement("div");
	let newCardAuthorName = document.createElement("div");

	// adding class to book and author
	newCardBookName.classList.add("book-name");
	newCardAuthorName.classList.add("author-name");

	// appending them inside card 
	newCardContent.appendChild(newCardBookName);
	newCardContent.appendChild(newCardAuthorName);

	// to update their value
	newCardBookName.textContent = book;
	newCardAuthorName.textContent = author;

	// create footer
	let newCardFooter = document.createElement("div");
	newCard.appendChild(newCardFooter);
	newCardFooter.classList.add("card-footer");

	// creating total and completed pages
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





	
// let randomPage = Math.floor(Math.random() * 500);
//Assigning the input in object
// book1.name = `Book No. ${randomPage}`;
// book1.pages = randomPage;

