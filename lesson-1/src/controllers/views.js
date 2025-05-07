class ViewsController {
    async INDEX(req, res) {
        res.render('index');
    }
    async REGISTER(req, res) {
        res.render('register');
    }
    async LOGIN(req, res) {
        res.render('login');
    }
}

module.exports = new ViewsController();