const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require("./handler")

const routes = [{
    method: "GET",
    path: "/",
    handler: (req, h) => {
        return "Hello world!"
    }
}, {
    method: "POST",
    path: "/books",
    handler: addBookHandler
}, {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler
}, {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler
}]


module.exports = routes