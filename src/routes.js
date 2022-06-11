const { addBookHandler } = require("./handler")

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
}]


module.exports = routes