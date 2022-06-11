const { nanoid } = require("nanoid")
const books = require("./books")

const addBookHandler = (req, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
        if (name === undefined) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400)
        }

        if (readPage > pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400)
        }

        id = nanoid(16)
        now = new Date().toISOString()

        data = {
            id, name, year, author, summary, publisher, pageCount, readPage, reading,
            finished: readPage === pageCount
        }

        books.push(data)
        isSuccess = books.filter(book => book.id === id).length > 0
        if (isSuccess) {
            return h.response({
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                "data": {
                    "bookId": id
                }
            }).code(200)
        }

        throw new Error("Failed to added book!")
    } catch (e) {
        console.log(e)
        console.log(e.message)
        return h.response({
            "status": "error",
            "message": "Buku gagal ditambahkan"
        }).code(500)
    }

}

const getAllBooksHandler = (req, h) => {
    return h.response({
        status: "success",
        data: {
            books
        }
    }).code(200)
}

const getBookByIdHandler = (req, h) => {
    const bookId = req.params.bookId
    const book = books.filter(book => book.id === bookId)
    if (book.length > 0) {
        return h.response({
            status: "success",
            data: {
                book
            }
        }).code(200)
    }

    return h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    }).code(404)
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler }