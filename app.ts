interface Book {
    title: string;
    author: string;
}

// In-memory data store for books
let books: Book[] = [];

// Function to add a new book
function addBook(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const titleInput = document.getElementById('title') as HTMLInputElement;
        const authorInput = document.getElementById('author') as HTMLInputElement;
        const title = titleInput.value;
        const author = authorInput.value;

        if (title && author) {
            const newBook: Book = { title, author };
            books.push(newBook);
            renderBooks()
            clearForm();
            resolve();
        } else {
            reject(new Error('Please enter both title and author.'));
        }
    });
}

// Function to delete a book
function deleteBook(index: number): Promise<void> {
    return new Promise<void>((resolve) => {
        books.splice(index, 1);
        renderBooks();
        resolve();
    });
}

// Function to render the list of books
function renderBooks(): Promise<void> {
    return new Promise<void>((resolve) => {
        const bookList = document.getElementById('bookList') as HTMLUListElement;
        bookList.innerHTML = '';

        books.forEach((book, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<b>${book.title}</b> by ${book.author} 
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>`;
            bookList.appendChild(listItem);
        });

        resolve();
    });
}

// Function to edit a book
function editBook(index: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const book = books[index];
        const newTitle = prompt('Enter new title:', book.title);
        const newAuthor = prompt('Enter new author:', book.author);

        if (newTitle && newAuthor) {
            book.title = newTitle;
            book.author = newAuthor;
            renderBooks();
            resolve();
        } else {
            reject(new Error('Please enter both title and author.'));
        }
    });
}

// Function to clear the form after adding a book
function clearForm(): void {
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const authorInput = document.getElementById('author') as HTMLInputElement;
    titleInput.value = '';
    authorInput.value = '';
}

// Initial rendering of books when the page loads
renderBooks();
