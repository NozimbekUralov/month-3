class UsersController {
    #service;
    constructor(service) {
        this.#service = service;
        this.CREATE = this.CREATE.bind(this);
        this.GET_ALL = this.GET_ALL.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this.UPDATE = this.UPDATE.bind(this);
        this.GET_BY_ID = this.GET_BY_ID.bind(this);
    }
    async CREATE(req, res) { }
    async GET_ALL(req, res) { }
    async DELETE(req, res) { }
    async UPDATE(req, res) { }
    async GET_BY_ID(req, res) { }
}

module.exports = UsersController;