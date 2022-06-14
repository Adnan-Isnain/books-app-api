const { nanoid } = require("nanoid")
const books = require("./books")

const addBookHandler = (req, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
        if (name === undefined) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400)
        }

        if (readPage > pageCount) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400)
        }

        const id = nanoid(16)
        const insertedAt = new Date().toISOString()
        const updatedAt = insertedAt
        const finished = readPage === pageCount

        const data = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            insertedAt,
            updatedAt
        }

        books.push(data)
        const isSuccess = books.filter(book => book.id === id).length > 0
        if (isSuccess) {
            return h.response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: id
                }
            }).code(201)
        }

        throw new Error("Failed to added book!")
    } catch (e) {
        console.log(e)
        console.log(e.message)
        return h.response({
            status: "error",
            message: "Buku gagal ditambahkan"
        }).code(500)
    }

}

const getAllFilterBooks = (query) => {
    return {
        books: books.filter(book => {
            return Object.keys(query).every(field => {
                if (field === "name") {
                    return book[field].toLowerCase().includes(query[field])
                }

                return book[field] === query[field]
            })
        }).map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
}


const getAllBooksHandler = (req, h) => {
    if (Object.entries(req.query).length > 0) {
        const { reading, finished, name } = req.query
        const query = {
            ...(reading !== undefined && { reading: (reading === "1") }),
            ...(finished !== undefined && { finished: (finished === "1") }),
            ...(name !== undefined && { name: name.toLowerCase() }),
        }

        return h.response({
            status: "success",
            data: getAllFilterBooks(query)
        }).code(200)

    }


    const allBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }))
    return h.response({
        status: "success",
        data: {
            books: allBooks
        }
    }).code(200)
}

const getBookByIdHandler = (req, h) => {
    const bookId = req.params.bookId
    const book = books.filter(book => book.id === bookId)[0]
    if (book === undefined) {
        return h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        }).code(404)
    }

    return h.response({
        status: "success",
        data: {
            book
        }
    }).code(200)
}


const editBookByIdHandler = (req, h) => {
    const bookId = req.params.bookId
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

    if (name === undefined) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400)
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)
    }

    const bookIdx = books.findIndex(book => book.id == bookId)
    if (bookIdx === -1) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404)
    }

    const updatedAt = new Date().toISOString()
    const finished = readPage === pageCount
    books[bookIdx] = {
        ...books[bookIdx],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt
    }
    return h.response({
        status: "success",
        message: "Buku berhasil diperbarui"
    }).code(200)
}

const deleteBookByIdHandler = (req, h) => {
    const bookId = req.params.bookId
    const bookIdx = books.findIndex(book => book.id === bookId)
    if (bookIdx === -1) {
        return h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404)
    }

    books.splice(bookIdx, 1)
    return h.response({
        status: "success",
        message: "Buku berhasil dihapus"
    }).code(200)
}


module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }