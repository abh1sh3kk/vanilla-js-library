const headline = document.querySelector('.headline');
const plus = document.querySelector(".addBook"); 
const form = document.querySelector(".formContainer");
const cancelButton = document.querySelector(".cancel");

headline.addEventListener("mouseover", function() {
	this.setAttribute("style","color: cyan");
})
headline.addEventListener("mouseout", function() {
	this.setAttribute("style", "color: white");
})


// ****************************************************

let bookList = []; 

let book = {
	name: "science", 
	pages: 300
};
cancelButton.addEventListener("click", function() {
	form.setAttribute("style", "visibility: hidden");
})

plus.addEventListener("click", function() {

	form.setAttribute("style", "visibility: visible");
	let book1 = Object.create(book);

	let randomPage = Math.floor(Math.random() * 500);

	// book1.name = prompt("Enter the name of the book: ");
	// book1.pages = prompt("Enter the no. of pages:");

	book1.name = `Book No. ${randomPage}`;
	book1.pages = randomPage;

	bookList.push(book1);

	console.clear();


	for (let i=0; i < bookList.length; i++) { 
		console.log(bookList[i]);
	}

	console.log("Information: ");
	console.log(`Number of books: ${bookList.length}`);
});



