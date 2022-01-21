export default class BaseController {
  constructor(model, db) {
    this.model = model;
    this.db = db;
  }

  async create(obj) {
    const newEntry = await this.model.create(obj);
    return newEntry;
  }

  async getAll(params = null) {
    const rows = await this.model.findAll(params);
    return rows;
  }
}
