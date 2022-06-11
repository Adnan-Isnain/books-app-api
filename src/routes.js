const routes = [{
    method: "GET",
    path: "/",
    handler: (req, h) => {
        return "Hello world!"
    }
}]


module.exports = routes