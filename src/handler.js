const addBookHandler = (req, h) => {
    try {
        const payload = req.payload
        if (payload.name === undefined) {
            res = h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400)

            return res
        }

        if (payload.readPage > payload.PageCount) {
            res = h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400)

            return res
        }

        id = nanoid(16)
        now = new Date().toISOString()

        data = { ...payload, createdAt: now, updatedAt: now }
        res = h.response({
            status: "OK!",
            message: `Hai ${data.syalala}, salam kenal!`
        })
        res.code(200)
        return res

    } catch (e) {
        console.log(e)
        console.log(e.message)
        res = h.response({
            "status": "error",
            "message": "Buku gagal ditambahkan"
        }).code(500)

        return res
    }

}



module.exports = { addBookHandler }