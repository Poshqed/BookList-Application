//Book Class: That will represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class: That will Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'David Beckham',
                isbn: '567436547'
            },

            {
                title: 'Book Two',
                author: 'King Jesse',
                isbn: '434232247'
            },

            {
                title: 'Book Three',
                author: 'Michael Trish',
                isbn: '908766761'
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr')
        row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href = "#" class="btn btn-danger btn-sm delete">X</a></td>

        `
        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        };

    }
    // Alert Decor
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode((message)))

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')

        container.insertBefore(div, form);


        //set timeout for the alert
        setTimeout(() => document.querySelector('.alert').remove(), 2000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#author').value = '';

    }
}

//Storage class

//Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)


//Event: Add a book
document.getElementById('book-form').addEventListener('submit', (e) => {

    e.preventDefault();
    //Get Form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please Complete all fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        // Add Book to UI
        UI.addBookToList(book);


        // Alert when you add book

        UI.showAlert('Book Added', 'success')


        // Clear Fields
        UI.clearFields();

    }


});
//Event: Remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);

    // Alert when you delete book

    UI.showAlert('Book Deleted', 'success')
})