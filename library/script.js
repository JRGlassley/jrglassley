function Book(title, author, pageCount, isRead) {
   this.title = title;
   this.author = author;
   this.pageCount = pageCount;
   this.isRead = isRead;
   this.info = function () {
      let readClause = this.isRead ? 'already read' : 'not read yet';
      return `${title} by ${author}, ${pageCount} pages, ${readClause}`;
   }
}

function addBook(book) {
   const cardsDiv = document.querySelector(".cards");
   const card = document.createElement("div");
   card.classList.add("card");

   const inputChecked = book.isRead ? " checked" : "";
   card.innerHTML = `
      <p class="title">${book.title}</p>
      <div class="content">
         <div>
            <p class="author">Author:</p>
            <p>${book.author}</p>
         </div>
         <div>
            <p class="pages">Pages:</p>
            <p>${book.pageCount}</p>
         </div>
         <div>
            <label for="1-has-read">Done reading: </label>
            <input type="checkbox" disabled="disabled" name="1-has-read" id="1-has-read" ${inputChecked}>
         </div>
      </div>`;

   const plusCard = document.querySelector(".plus");
   cardsDiv.insertBefore(card, plusCard);
}



function createBook() {
   const title = document.querySelector("#title");
   const author = document.querySelector("#author");
   const pages = document.querySelector("#pages");
   const isDoneReading = document.querySelector("#done-reading");

   return new Book(title.value,
      author.value,
      pages.value,
      isDoneReading.checked);
}

function resetFields() {
   const title = document.querySelector("#title");
   const author = document.querySelector("#author");
   const pages = document.querySelector("#pages");
   const isDoneReading = document.querySelector("#done-reading");

   title.value = '';
   author.value = '';
   pages.value = '';
   isDoneReading.checked = false;
}

document.addEventListener("DOMContentLoaded", () => {

   const plusDiv = document.querySelector(".plus");
   const plusForm = document.querySelector(".plus-form");
   const submitButton = document.querySelector("#submit");
   const cancelButton = document.querySelector("#cancel");

   plusDiv.addEventListener("click", () => {
      plusDiv.classList.add("hidden");
      plusForm.classList.remove("hidden");
   });

   submitButton.addEventListener("click", () => {
      plusDiv.classList.remove("hidden");
      plusForm.classList.add("hidden");
      addBook(createBook());
      resetFields();
   });
   cancelButton.addEventListener("click", () => {
      plusDiv.classList.remove("hidden");
      plusForm.classList.add("hidden");
      resetFields();
   });

   // add hard-coded books
   addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
   addBook(new Book("Of Mice and Men", "John Steinbeck", 107, false));
   addBook(new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 223, true));
});