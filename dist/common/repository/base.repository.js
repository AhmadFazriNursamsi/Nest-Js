"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const not_found_exception_1 = require("../../exception/not-found.exception");
const paginate_1 = require("../../paginate");
const model_serializer_1 = require("../serializer/model.serializer");
class BaseRepository extends typeorm_1.Repository {
    async get(id, relations = [], transformOptions = {}) {
        return await this.findOne({
            where: {
                id
            },
            relations
        })
            .then((entity) => {
            if (!entity) {
                return Promise.reject(new not_found_exception_1.NotFoundException());
            }
            return Promise.resolve(entity ? this.transform(entity, transformOptions) : null);
        })
            .catch((error) => Promise.reject(error));
    }
    async findBy(fieldName, value, relations = [], transformOptions = {}) {
        return await this.findOne({
            where: {
                [fieldName]: value
            },
            relations
        })
            .then((entity) => {
            if (!entity) {
                return Promise.reject(new not_found_exception_1.NotFoundException());
            }
            return Promise.resolve(entity ? this.transform(entity, transformOptions) : null);
        })
            .catch((error) => Promise.reject(error));
    }
    async countEntityByCondition(conditions = {}) {
        return this.count({
            where: conditions
        })
            .then((count) => {
            return Promise.resolve(count);
        })
            .catch((error) => Promise.reject(error));
    }
    async findAll(searchFilter, relations = [], searchCriteria, transformOptions = {}) {
        const whereCondition = [];
        if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
            for (const key of searchCriteria) {
                whereCondition.push({
                    [key]: (0, typeorm_1.ILike)(`%${searchFilter.keywords}%`)
                });
            }
        }
        const results = await this.find({
            where: whereCondition,
            relations
        });
        return this.transformMany(results, transformOptions);
    }
    getPaginationInfo(options) {
        const page = typeof options.page !== 'undefined' && options.page > 0
            ? options.page
            : 1;
        const limit = typeof options.limit !== 'undefined' && options.limit > 0
            ? options.limit
            : 10;
        return {
            skip: (page - 1) * limit,
            limit,
            page
        };
    }
    async paginate(searchFilter, relations = [], searchCriteria = [], transformOptions = {}) {
        const whereCondition = [];
        const findOptions = {};
        if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
            for (const key of searchCriteria) {
                whereCondition.push({
                    [key]: (0, typeorm_1.ILike)(`%${searchFilter.keywords}%`)
                });
            }
        }
        const paginationInfo = this.getPaginationInfo(searchFilter);
        findOptions.relations = relations;
        findOptions.take = paginationInfo.limit;
        findOptions.skip = paginationInfo.skip;
        findOptions.where = whereCondition;
        findOptions.order = {
            createdAt: 'DESC'
        };
        const { page, skip, limit } = paginationInfo;
        const [results, total] = await this.findAndCount(findOptions);
        const serializedResult = this.transformMany(results, transformOptions);
        return new paginate_1.Pagination({
            results: serializedResult,
            totalItems: total,
            pageSize: limit,
            currentPage: page,
            previous: page > 1 ? page - 1 : 0,
            next: total > skip + limit ? page + 1 : 0
        });
    }
    async createEntity(inputs, relations = []) {
        return this.save(inputs)
            .then(async (entity) => await this.get(entity.id, relations))
            .catch((error) => Promise.reject(error));
    }
    async updateEntity(entity, inputs, relations = []) {
        return this.update(entity.id, inputs)
            .then(async () => await this.get(entity.id, relations))
            .catch((error) => Promise.reject(error));
    }
    transform(model, transformOptions = {}) {
        return (0, class_transformer_1.plainToClass)(model_serializer_1.ModelSerializer, model, transformOptions);
    }
    transformMany(models, transformOptions = {}) {
        return models.map((model) => this.transform(model, transformOptions));
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map