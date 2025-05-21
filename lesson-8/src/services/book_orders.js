const BaseService = require('./index');

module.exports = class BookOrdersService extends BaseService {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.getOneByName = this.getOneByName.bind(this);
    }

}