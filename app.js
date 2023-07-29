// In-memory data store for books
var books = [];
// Function to add a new book
function addBook() {
    return new Promise(function (resolve, reject) {
        var titleInput = document.getElementById('title');
        var authorInput = document.getElementById('author');
        var title = titleInput.value;
        var author = authorInput.value;
        if (title && author) {
            var newBook = { title: title, author: author };
            books.push(newBook);
            renderBooks();
            clearForm();
            resolve();
        }
        else {
            reject(new Error('Please enter both title and author.'));
        }
    });
}
// Function to delete a book
function deleteBook(index) {
    return new Promise(function (resolve) {
        books.splice(index, 1);
        renderBooks();
        resolve();
    });
}
// Function to render the list of books
function renderBooks() {
    return new Promise(function (resolve) {
        var bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        books.forEach(function (book, index) {
            var listItem = document.createElement('li');
            listItem.innerHTML = "<b>".concat(book.title, "</b> by ").concat(book.author, " \n                <button onclick=\"editBook(").concat(index, ")\">Edit</button>\n                <button onclick=\"deleteBook(").concat(index, ")\">Delete</button>");
            bookList.appendChild(listItem);
        });
        resolve();
    });
}
// Function to edit a book
function editBook(index) {
    return new Promise(function (resolve, reject) {
        var book = books[index];
        var newTitle = prompt('Enter new title:', book.title);
        var newAuthor = prompt('Enter new author:', book.author);
        if (newTitle && newAuthor) {
            book.title = newTitle;
            book.author = newAuthor;
            renderBooks();
            resolve();
        }
        else {
            reject(new Error('Please enter both title and author.'));
        }
    });
}
// Function to clear the form after adding a book
function clearForm() {
    var titleInput = document.getElementById('title');
    var authorInput = document.getElementById('author');
    titleInput.value = '';
    authorInput.value = '';
}
// Initial rendering of books when the page loads
renderBooks();
