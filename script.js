// ***************************************************
let generateBtn = document.querySelector(".generate-random-books");
let plus = document.querySelector(".addBook"); 
let form = document.querySelector(".formContainer");
let cancelButton = document.querySelector(".cancel");
let theForm = document.querySelector("form");
let submitButton = document.querySelector(".submit");
let bookName = document.querySelector(".bookName");
let bookAuthor = document.querySelector(".bookAuthor");
let totalPages = document.querySelector(".totalPages");
let completedPages = document.querySelector(".pagesCompleted");
let displayBookName = document.querySelector(".book-name");
let card__readPages = document.querySelector(".read-pages");
let card__totalPages = document.querySelector(".total-pages");
let errorMessage_only = document.querySelector(".specific-error");
let errorMessage_with_X = document.querySelector(".error-message");
let dustbin = document.querySelector(".info-image");
let info__numberOfBooks = document.querySelector(".numberOfBooks");
let info__completedBooks = document.querySelector(".completedBooks");
let info__remainingBooks = document.querySelector(".remainingBooks");
let formData = new FormData(form);
let cardContainer = document.querySelector(".card-container");
let bookList = {};

// **************** DRIVER CODES ********************************
renderCards();






// ************************* FUNCTIONS **************************

// Factory function
function book(name, author, tPages, cPages) {
	return {
		name,
		author,
		tPages, 
		cPages
	}
}

function renderCards() {
	bookList = JSON.parse(localStorage.getItem("bookList"));

	console.log(typeof bookList);
	
	clearCards();
	for(let i=0; i<bookList.length; i++) {
		cardGenerator(bookList[i].name, bookList[i].author, bookList[i].tPages, bookList[i].cPages);
	}
	updateInfo();
}
function clearCards() {
	while(cardContainer.firstElementChild.tagName != "BUTTON") {
		cardContainer.removeChild(cardContainer.firstElementChild);
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
function updateInfo() {
	info__numberOfBooks.textContent = bookList.length;
}	



// #################################### EVENT LISTENERS ##############################################

plus.addEventListener("click", function() {
	form.style.visibility = "visible";
});

cancelButton.addEventListener("click", function() {
	form.style.visibility = "hidden";
	errorMessage_with_X.style.visibility = "hidden"; 
})

dustbin.addEventListener("click", () => {
	bookList.length = 0;
	localStorage.setItem("bookList", JSON.stringify(bookList));
	renderCards();
})

theForm.addEventListener("submit", function(e) {
	let flag = 1; 
	
	
	if (+completedPages.value > +totalPages.value) {
		flag = 0;
		errorMessage_with_X.style.visibility = "visible"; 
	}
	if (bookAuthor.value.length >30) {
		flag = 0;
		errorMessage_with_X.style.visibility = "visible"; 
	}
	
	
	if (flag == 1){
		// errorMessage_with_X.style.visibility = "hidden";
		
		// getting value from form and making an object to push in bookList
		let book1 = book(bookName.value, bookAuthor.value, totalPages.value, completedPages.value); 	
		bookList.push(book1);
		localStorage.setItem("bookList", JSON.stringify(bookList));
		
		console.clear();
		console.log(typeof bookList);
		
		// cardGenerator(bookName.value, bookAuthor.value, totalPages.value, completedPages.value);
		renderCards();
		updateInfo();
	}
	else {
		e.preventDefault();
	}
	
	
});

generateBtn.addEventListener("click", ()=> {

		localStorage.clear();

		bookList = [{
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
	
]
		localStorage.setItem("bookList", JSON.stringify(bookList));
		renderCards();
})