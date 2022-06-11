const addBookHandler = (req, h) => {
    const { name } = req.payload
    res = h.response({
        status: "OK!",
        message: `Hai ${name}, salam kenal!`
    })
    res.code(200)
    return res
}



module.exports = { addBookHandler }