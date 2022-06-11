const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler } = require("./handler")

const root = {
    method: "GET",
    path: "/",
    handler: () => {
        return "Hello world!"
    }
}

const getAllBooks = {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler
}

const addBook = {
    method: "POST",
    path: "/books",
    handler: addBookHandler
}

const getBookById = {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler
}

const editBookById = {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler
}

module.exports = [root, getAllBooks, addBook, getBookById, editBookById]