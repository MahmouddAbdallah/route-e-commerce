'use strick'

class FeatureAPI {
    constructor(req, Model) {
        this.req = req
        this.Model = Model
    }
    filter() {
        let query = this.req.query;
        query = JSON.stringify(query)
        query = JSON.parse(query.replace(/\b(gte|gt|lte|eq)\b/g, (match) => `$${match}`));
        const v = ['page', 'limit', 'fields', 'keyword', 'sort', 'select']
        v.forEach((element) => {
            delete query[element];
        })
        this.Model = this.Model.find(query);
        return this
    }
    sort() {
        let sort = this.req.query.sort || '-createdAt';
        sort = sort.split(',').join(" ")
        this.Model = this.Model.sort(sort);
        return this
    }
    fields() {
        let fields = this.req.query.fields || '-__v';
        this.Model = this.Model.select(fields)
        return this
    }
    search(search) {
        let keyword = this.req.query.keyword;
        if (keyword) {
            let search = {};
            search.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { first_name: { $regex: keyword, $options: 'i' } },
            ]
            this.Model = this.Model.find(search)
        }
        return this
    }
}
module.exports = FeatureAPI;